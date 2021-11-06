import store from '../store/store'

import PluginAEdit from './PluginA/Edit.vue'
import PluginASolve from './PluginA/Solve.vue'
import * as helpersA from './PluginA/helpers.js'

import PluginBEdit from './PluginB/Edit.vue'
import PluginBSolve from './PluginB/Solve.vue'
import * as helpersB from './PluginB/helpers.js'

import DivisionEdit from './Division/Edit.vue'
import DivisionSolve from './Division/Solve.vue'
import * as DivisionHelpers from './Division/helpers.js'

import MapEdit from './Map/Edit.vue'
import MapSolve from './Map/Solve.vue'
import * as helpersMap from './Map/helpers.js'

import MultipleChoiceEdit from './MultipleChoice/Edit.vue'
import MultipleChoiceSolve from './MultipleChoice/Solve.vue'
import * as helpersMultipleChoice from './MultipleChoice/helpers.js'

import CodeEdit from './Code/Edit.vue'
import CodeSolve from './Code/Solve.vue'
import * as helpersCode from './Code/helpers.js'

const plugins = []

function registerOne (app, plugin, helpers, components) {
  components.forEach(c => {
    app.component(plugin + c.type, c.component)
  })
  plugins.push({
    name: plugin,
    helpers
  })
}

function register (app) {
  registerOne(app, 'PluginA', helpersA, [
    {
      type: 'Edit',
      component: PluginAEdit
    },
    {
      type: 'Solve',
      component: PluginASolve
    }
  ])
  registerOne(app, 'PluginB', helpersB, [
    {
      type: 'Edit',
      component: PluginBEdit
    },
    {
      type: 'Solve',
      component: PluginBSolve
    }
  ])
  registerOne(app, 'Division', DivisionHelpers, [
    {
      type: 'Edit',
      component: DivisionEdit
    },
    {
      type: 'Solve',
      component: DivisionSolve
    }
  ])
  registerOne(app, 'Map', helpersMap, [
    {
      type: 'Edit',
      component: MapEdit
    },
    {
      type: 'Solve',
      component: MapSolve
    }
  ])
  registerOne(app, 'MultipleChoice', helpersMultipleChoice, [
    {
      type: 'Edit',
      component: MultipleChoiceEdit
    },
    {
      type: 'Solve',
      component: MultipleChoiceSolve
    }
  ])
  registerOne(app, 'Code', helpersCode, [
    {
      type: 'Edit',
      component: CodeEdit
    },
    {
      type: 'Solve',
      component: CodeSolve
    }
  ])

  store.state.plugins = plugins
}

export default register
