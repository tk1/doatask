<template>
  <TaskEditBase v-model="task">
    <template #header>
      <h2>Map</h2>
    </template>
    <template #details>
      <div id="mapid" />
      <div class="p-fluid p-grid p-formgrid">
        <div class="p-field p-col-12 p-md-3">
          <label for="number1">Latitude</label>
          <InputText
            id="number1"
            v-model="task.details.lat"
            type="text"
            @input="changed"
          />
        </div>
        <div class="p-field p-col-12 p-md-3">
          <label for="number2">Longitude</label>
          <InputText
            id="number2"
            v-model="task.details.lng"
            type="text"
            @input="changed"
          />
        </div>
      </div>
    </template>
  </TaskEditBase>
</template>

<script>
import leaflet from 'leaflet'
import '../../../node_modules/leaflet/dist/leaflet.css'

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

// https://help.openstreetmap.org/questions/40664/how-to-hide-all-labels-of-osm
// const tileUrl = 'http://{s}.tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png'

let mymap
let marker = null

function setMarker (latlng) {
  if (latlng?.lat) {
    if (marker) {
      marker.remove()
    }
    marker = leaflet.marker([latlng.lat, latlng.lng])
    marker.addTo(mymap)
  }
}

export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['detailsChanged'],
  data () {
    return {
      task: null
    }
  },
  created () {
    this.task = this.modelValue
  },
  mounted () {
    mymap = leaflet.map('mapid').setView([51.16, 10.45], 6)
    leaflet.tileLayer(
      tileUrl,
      {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(mymap)

    setMarker(this.task.details)
    const that = this
    function onMapClick (e) {
      that.task.details.lat = e.latlng.lat
      that.task.details.lng = e.latlng.lng
      setMarker(e.latlng)
      that.$emit('detailsChanged', that.task.details)
    }

    mymap.on('click', onMapClick)
  },
  methods: {
    changed: function (event) {
      this.$emit('detailsChanged', this.task.details)
    }
  }
}
</script>

<style scoped>
span {
  margin: 5px;
}
#mapid {
  height: 600px;
  width: 500px;
}
</style>
