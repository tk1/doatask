<template>
  <TaskSolveBase
    :taskId="taskId"
    :assignmentId="assignmentId"
    :rated="rated"
    @timeOver="submitEmptySolution"
  >
    <template #header>
      &nbsp;
    </template>
    <template #details="slotProps">
      <h1>
        Click on <span class="em">
          {{
            slotProps.task.title
          }}
        </span> and submit.
      </h1>
    </template>
    <template #solution="slotProps">
      <Message
        v-if="submission?.feedback"
        severity="info"
        :closable="false"
      >
        Your distance: {{ formattedDistance }} |
        Your points: {{ Math.round(100* submission.grade) }} of 100 |
        Your rating: {{ Math.round(submission.rating) }}
      </Message>
      <Button
        :disabled="!solution.lat || slotProps.alreadySubmitted"
        @click="submitSolution(slotProps)"
      >
        {{ buttonText(slotProps) }}
      </Button>
      <div
        :id="mapId"
        class="map"
      />
    </template>
  </TaskSolveBase>
</template>

<script>
import leaflet from 'leaflet'
import '../../../node_modules/leaflet/dist/leaflet.css'

import iconRetinaUrl from './assets/marker-icon-2x.png'
import iconUrl from './assets/marker-icon.png'
import shadowUrl from './assets/marker-shadow.png'

// https://stackoverflow.com/questions/41144319/leaflet-marker-not-found-production-env
// const iconRetinaUrl = '/assets/marker-icon-2x.png'
const iconDefault = leaflet.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})
leaflet.Marker.prototype.options.icon = iconDefault

// const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

// https://help.openstreetmap.org/questions/40664/how-to-hide-all-labels-of-osm
const tileUrl = 'http://{s}.tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png'
let mymap
let marker = null

function setMarker (latlng) {
  if (marker) {
    marker.remove()
  }
  marker = leaflet.marker([latlng.lat, latlng.lng])
  marker.addTo(mymap)
}

export default {
  props: {
    taskId: {
      type: Number,
      required: true
    },
    assignmentId: {
      type: Number,
      default: -1
    },
    task: {
      type: Object,
      required: true
    },
    rated: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      solution: {},
      submission: null
    }
  },
  computed: {
    mapId () {
      return 'map' + this.taskId
    },
    formattedDistance () {
      return `${Math.round(this.submission.feedback.distance / 1000)} km`
    }

  },
  created () {
    // https://next.router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        this.solution = {}
        this.submission = null
        mymap.setView([49.413195, 6.660074], 10)
        if (marker) {
          marker.remove()
        }
      }
    )
  },
  mounted () {
    const that = this

    mymap = leaflet.map(that.mapId).setView([51.16, 10.45], 6)
    const layer = leaflet.tileLayer(
      tileUrl,
      {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      })
    layer.addTo(mymap)

    const dataPoints = {
      type: 'FeatureCollection',
      name: 'big-cities',
      features: [
        {
          type: 'Feature',
          properties: { name: 'Saarbrücken' },
          geometry: { type: 'Point', coordinates: [6.996, 49.236] }
        },
        {
          type: 'Feature',
          properties: { name: 'Frankfurt' },
          geometry: { type: 'Point', coordinates: [8.679, 50.113] }
        }
      ]
    }

    const L = leaflet
    const pointLayer = L.geoJSON(null, {
      pointToLayer: function (feature, latlng) {
        const label = String(feature.properties.name)
        return new L.CircleMarker(latlng, {
          radius: 0.1
        }).bindTooltip(label, { permanent: true, direction: 'center', className: 'my-labels' }).openTooltip()
      }
    })
    pointLayer.addData(dataPoints)
    mymap.addLayer(pointLayer)

    function onMapClick (e) {
      that.solution.lat = e.latlng.lat
      that.solution.lng = e.latlng.lng
      setMarker(e.latlng)
    }

    mymap.on('click', onMapClick)
  },
  methods: {
    submitSolution: async function (slotProps) {
      this.submission = await slotProps.submit(
        {
          value: this.solution,
          timeNeeded: -1
        }
      )
      slotProps.submitReceived(this.submission)
    },
    async submitEmptySolution (slotProps) {
      this.submission = await slotProps.submit(
        {
          value: null,
          timeNeeded: 0
        }
      )
      slotProps.submitReceived(this.submission)
    },
    buttonText (slotProps) {
      if (slotProps.alreadySubmitted) {
        return 'Already submitted'
      } else if (this.solution.lat) {
        return 'Submit solution'
      } else {
        return 'Enter solution'
      }
    }
  }
}
</script>

<style scoped>
.map {
  height: 600px;
  width: 500px;
}
.em {
  color: blue;
}
.my-labels {
  background-color: transparent;
  border: transparent;
  box-shadow: none;
  font-weight: bold;
  font-size: 20px;
  }
</style>
