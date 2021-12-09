<template>
  <TaskEditBase v-model="task">
    <template #header>
      <h2>Code</h2>
    </template>
    <template #details>
      <div class="p-fluid p-grid p-formgrid">
        <div class="p-field p-col-12 p-md-3">
          <label>Language</label>
          <Dropdown
            id="language"
            v-model="task.details"
            :options="languages"
            option-label="language"
            placeholder="Select a language"
            @change="setTypeForParameter"
          />
        </div>
        <div
          v-if="task.details.methodStub !== undefined"
          class="p-field p-col-12 p-md-3"
        >
          <label>Function</label>
          <InputText
            id="functionName"
            v-model="task.details.methodStub.functionName"
            type="text"
            autocomplete="off"
          />
        </div>
        <div class="p-field p-col-12 p-md-2">
          <label>Return Type</label>
          <Dropdown
            id="returnType"
            v-model="task.details.methodStub.returnType"
            :options="typesForSelectedLanguage"
            option-label="type"
            placeholder="Select a return Type"
          />
        </div>
      </div>
      <h4 class="p-col-12">
        Parameter
      </h4>
      <template
        v-for="(parameter, index) in parameters"
        :key="index"
      >
        <div class="p-fluid p-grid p-formgrid">
          <div class="p-field p-col-12 p-md-2">
            <label>Type</label>
            <Dropdown
              id="parameterType"
              v-model="parameter.type"
              :options="typesForSelectedLanguage"
              option-label="type"
              placeholder="Select a type"
              @change="saveParameterInTask"
            />
          </div>
          <div class="p-field p-col-12 p-md-2">
            <label>Parameter</label>
            <InputText
              id="parameter"
              v-model="parameter.name"
              type="text"
              autocomplete="off"
              @change="saveParameterInTask"
            />
          </div>
        </div>
      </template>
      <Button @click="addParameter">
        Add Parameter
      </Button>
      <template
        v-for="(test, index) in tests"
        :key="index"
      >
        <div class="p-fluid p-grid p-formgrid">
          <div class="p-field-checkbox p-col-4 p-md-2">
            <Checkbox
              id="isSecretTest"
              v-model="test.isSecretTest"
              :binary="true"
              @change="saveTestsInTask"
            />
            <label for="secretTest">Secret Test</label>
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label>Test Parameter</label>
            <InputText
              id="testParameter"
              v-model="test.testParameter"
              type="text"
              autocomplete="off"
              @change="saveTestsInTask"
            />
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label>Expected Output</label>
            <InputText
              id="expectedOutput"
              v-model="test.expectedOutput"
              type="text"
              autocomplete="off"
              @change="saveTestsInTask"
            />
          </div>
        </div>
      </template>
      <Button @click="addTest">
        Add Test
      </Button>
    </template>
  </TaskEditBase>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      task: null,
      typesForSelectedLanguage: [],
      languages: [],
      parameters: [],
      tests: []
    }
  },
  created () {
    this.task = this.modelValue
    this.task.details.methodStub = {
      functionName: '',
      parameter: [{ name: '', type: '' }]
    }
    this.languages = [{ language: 'JavaScript' },
      { language: 'Python' }]

    this.parameters = this.task.details.methodStub.parameter.map((v) => ({
      name: v.text,
      type: v.type
    }))

    this.tests = [{
      isSecretTest: false,
      testParameter: [],
      expectedOutput: ''
    }]

    this.tests = this.tests.map((v) => ({
      isSecretTest: v.isSecretTest,
      testParameter: v.testParameter,
      expectedOutput: v.expectedOutput
    }))

    this.saveTestsInTask()

    this.saveParameterInTask()
  },
  methods: {
    setTypeForParameter (e) {
      const language = e.value.language
      if (language === 'JavaScript') {
        this.typesForSelectedLanguage = [{ type: 'boolean' },
          { type: 'string' },
          { type: 'int' },
          { type: 'booleanArray' },
          { type: 'stringArray' },
          { type: 'intArray' }]
      } else if (language === 'Python') {
        this.typesForSelectedLanguage = [{ type: 'boolean' },
          { type: 'string' },
          { type: 'int' },
          { type: 'booleanArray' },
          { type: 'stringArray' },
          { type: 'intArray' }]
      }

      this.task.details.methodStub = {
        functionName: ''
      }

      this.tests = [{
        isSecretTest: false,
        testParameter: [],
        expectedOutput: ''
      }]

      return this.typesForSelectedLanguage
    },
    addParameter () {
      this.parameters.push({ name: '', type: '' })
    },
    addTest () {
      this.tests.push({ isSecretTest: false, testParameter: [], testResult: '' })
    },
    saveParameterInTask () {
      this.task.details.methodStub.parameter = this.parameters.map((v) => ({ name: v.name, type: v.type.type }))
    },
    saveTestsInTask () {
      const secretTests = []
      const publicTests = []
      const testSuite = []

      testSuite.push(this.tests.map((v, i) => {
        if (v.isSecretTest === true) {
          secretTests.push({
            testParameter: v.testParameter,
            expectedOutput: v.expectedOutput
          })
          return secretTests
        } else if (v.isSecretTest === false) {
          publicTests.push({
            testParameter: v.testParameter,
            expectedOutput: v.expectedOutput
          })
          return publicTests
        }
        return 'undefined'
      }))

      this.task.details.testSuite = {
        publicTests: publicTests,
        secretTests: secretTests
      }
    }
  }
}
</script>
