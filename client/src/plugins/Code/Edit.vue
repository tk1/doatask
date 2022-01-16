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
            v-model="currentLanguage"
            :options="languages"
            option-label="language"
            placeholder="Select a language"
            @change="languageChanged"
          />
        </div>
        <div
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
            v-model="currentReturnType"
            :options="returnTypesForSelectedLanguage"
            option-label="returnType"
            placeholder="Select a return Type"
            @change="returnTypeChanged"
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
          <div class="p-field p-col-12 p-md-1 p-mt-5">
            <Button
              class="p-button-warning"
              @click="removeParameter(index)"
            >
              <i
                class="pi pi-trash"
              />
            </Button>
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
          <div class="p-field p-col-12 p-md-1 p-mt-5">
            <Button
              class="p-button-warning"
              @click="removeTest(index)"
            >
              <i
                class="pi pi-trash"
              />
            </Button>
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
      task: {
        details: {}
      },
      typesForSelectedLanguage: [],
      returnTypesForSelectedLanguage: [],
      languages: [{ language: 'JavaScript' },
        { language: 'Python' }],
      parameters: [],
      tests: [],
      currentLanguage: null,
      currentReturnType: null,
      secretTests: [],
      publicTests: []
    }
  },
  created () {
    this.task = this.modelValue
    if (!this.task.id) {
      console.log('created')
      this.task.details.methodStub = {
        functionName: '',
        returnType: '',
        parameter: [{ name: '', type: '' }]
      }

      this.parameters = [{
        name: '',
        type: ''
      }]

      this.tests = [{
        isSecretTest: false,
        testParameter: [],
        expectedOutput: ''
      }]
    } else {
      for (let i = 0; i < this.$store.state.tasks.length; i++) {
        if (this.$store.state.tasks[i].id === this.modelValue.id) {
          this.task = this.$store.state.tasks[i]
          this.parameters = this.task.details.methodStub.parameter.map((v, i) => ({
            name: v.name,
            type: {
              type: v.type
            }
          }))
          this.setTypeForParameter(this.task.details)
          this.setTypeForReturnType(this.task.details)

          this.currentLanguage = { language: this.task.details.language }
          this.currentReturnType = { returnType: this.task.details.methodStub.returnType }

          let publicTest = []
          let secretTest = []
          if (this.task.details.testSuite.publicTests.length !== 0) {
            publicTest = this.task.details.testSuite.publicTests.map((v, i) => ({
              isSecretTest: false,
              testParameter: v.testParameter,
              expectedOutput: v.expectedOutput
            }))
            for (let i = 0; i < publicTest.length; i++) {
              this.tests.push(publicTest[i])
            }
          }

          if (this.task.details.testSuite.secretTests.length !== 0) {
            secretTest = this.task.details.testSuite.secretTests.map((v, i) => ({
              isSecretTest: true,
              testParameter: v.testParameter,
              expectedOutput: v.expectedOutput
            }))
            for (let i = 0; i < secretTest.length; i++) {
              this.tests.push(secretTest[i])
            }
          }
        }
      }
    }

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
      const language = e.language
      if (language === 'JavaScript') {
        this.typesForSelectedLanguage = [
          { type: 'boolean' },
          { type: 'string' },
          { type: 'int' },
          { type: 'booleanArray' },
          { type: 'stringArray' },
          { type: 'intArray' }
        ]
      } else if (language === 'Python') {
        this.typesForSelectedLanguage = [
          { type: 'boolean' },
          { type: 'string' },
          { type: 'int' },
          { type: 'booleanArray' },
          { type: 'stringArray' },
          { type: 'intArray' }
        ]
      }

      return this.typesForSelectedLanguage
    },
    setTypeForReturnType (e) {
      const language = e.language
      if (language === 'JavaScript') {
        this.returnTypesForSelectedLanguage = [
          { returnType: 'boolean' },
          { returnType: 'string' },
          { returnType: 'int' },
          { returnType: 'booleanArray' },
          { returnType: 'stringArray' },
          { returnType: 'intArray' }
        ]
      } else if (language === 'Python') {
        this.returnTypesForSelectedLanguage = [
          { returnType: 'boolean' },
          { returnType: 'string' },
          { returnType: 'int' },
          { returnType: 'booleanArray' },
          { returnType: 'stringArray' },
          { returnType: 'intArray' }
        ]
      }

      return this.returnTypesForSelectedLanguage
    },
    languageChanged (e) {
      this.task.details = e.value
      this.setTypeForParameter(e.value)
      this.setTypeForReturnType(e.value)
      this.task.details.methodStub = {
        functionName: '',
        returnType: '',
        parameter: [{ name: '', type: '' }]
      }
    },
    returnTypeChanged (e) {
      this.returnType = e.value
      this.task.details.methodStub.returnType = this.returnType.returnType
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
      this.secretTests = []
      this.publicTests = []

      this.tests.map((v, i) => {
        if (v.isSecretTest === true) {
          this.secretTests.push({
            testParameter: this.stringToArray(v.testParameter),
            expectedOutput: this.checkType(v.expectedOutput)
          })
          return this.secretTests
        } else if (v.isSecretTest === false) {
          this.publicTests.push({
            testParameter: this.stringToArray(v.testParameter),
            expectedOutput: this.checkType(v.expectedOutput)
          })
          return this.publicTests
        }
        return []
      })

      this.task.details.testSuite.publicTests = this.publicTests.map((v) => ({ testParameter: v.testParameter, expectedOutput: v.expectedOutput }))
      this.task.details.testSuite.secretTests = this.secretTests.map((v) => ({ testParameter: v.testParameter, expectedOutput: v.expectedOutput }))
    },
    stringToArray (str) {
      if (str.includes(',')) {
        const arr = this.splitTestParameter(str)
        const result = arr.map((x) => {
          if (!isNaN(x) === true) {
            return parseInt(x)
          } else {
            return x
          }
        })
        str = result
      }

      return str
    },
    splitTestParameter (str) {
      const arr = str.split(',')
      return arr
    },
    checkType (str) {
      if (!isNaN(str) === true) {
        return parseInt(str)
      } else if (str === 'true') {
        return true
      } else if (str === 'false') {
        return false
      } else {
        return str
      }
    },
    removeParameter (index) {
      this.parameters.splice(index, 1)
      this.saveParameterInTask()
    },
    removeTest (index) {
      this.tests.splice(index, 1)
      this.saveTestsInTask()
    }
  }
}
</script>
