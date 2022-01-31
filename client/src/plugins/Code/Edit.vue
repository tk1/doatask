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
            <template
              v-for="(para, i) in test.testParameter"
              :key="i"
            >
              <label>Test Parameter: {{ showTypeForSelectedId(i) }}</label>
              <InputText
                id="testParameter"
                v-model="para.parameter"
                type="text"
                autocomplete="off"
                @change="saveTestsInTask"
              />
            </template>
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label>Expected Output: {{ currentReturnType?.returnType }}</label>
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
        <br><br>
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
      secTests: [],
      pubTests: []
    }
  },
  created () {
    this.task = this.modelValue
    if (!this.task.id) {
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
        testParameter: [{
          parameter: ''
        }],
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

          const publicTest = []
          const secretTest = []

          this.task.details.testSuite.publicTests.map((x) => {
            publicTest.push({
              isSecretTest: false,
              testParameter: this.setTestParameterArray(x.testParameter),
              expectedOutput: x.expectedOutput
            })
          })

          this.task.details.testSuite.secretTests.map((x) => {
            secretTest.push({
              isSecretTest: true,
              testParameter: this.setTestParameterArray(x.testParameter),
              expectedOutput: x.expectedOutput
            })
          })

          if (this.task.details.testSuite.publicTests.length !== 0) {
            for (let i = 0; i < publicTest.length; i++) {
              this.tests.push(publicTest[i])
            }
          }

          if (this.task.details.testSuite.secretTests.length !== 0) {
            for (let i = 0; i < secretTest.length; i++) {
              this.tests.push(secretTest[i])
            }
          }
        }
      }
    }
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
      this.tests.map((v, i) => {
        return v.testParameter.push({ parameter: '' })
      })
      this.saveParameterInTask()
    },
    addTest () {
      const arr = []
      this.parameters.map((v, i) => {
        return arr.push({ parameter: '' })
      })

      this.tests.push({ isSecretTest: false, testParameter: arr, testResult: '' })
      this.saveTestsInTask()
    },
    saveParameterInTask () {
      this.task.details.methodStub.parameter = this.parameters.map((v) => ({ name: v.name, type: v.type.type }))
    },
    saveTestsInTask () {
      this.secTests = []
      this.pubTests = []
      let parameterArr = []

      this.tests.map((v, inde) => {
        parameterArr = []
        v.testParameter.map((x, i) => {
          return this.parameters.map((p, index) => {
            if (i === index) {
              parameterArr.push(this.setTestParameterType(p.type.type, x.parameter))
            }
            return parameterArr
          })
        })
        if (v.isSecretTest === true) {
          this.secTests.push({
            testParameter: parameterArr,
            expectedOutput: this.setTestParameterType(this.returnType?.returnType, v.expectedOutput)
          })
          return this.secTests
        } else if (v.isSecretTest === false) {
          this.pubTests.push({
            testParameter: parameterArr,
            expectedOutput: this.setTestParameterType(this.returnType?.returnType, v.expectedOutput)
          })
          return this.pubTests
        }
        return []
      })

      this.task.details.testSuite = { publicTests: this.pubTests, secretTests: this.secTests }
    },
    setTestParameterType (type, parameter) {
      if (type === 'boolean') {
        return this.setBooleanType(parameter)
      } else if (type === 'string') {
        return parameter
      } else if (type === 'int') {
        return this.setIntType(parameter)
      } else if (type === 'booleanArray') {
        const arr = parameter.split(',')
        const boolArr = []
        arr.map((v, i) => {
          if (this.setBooleanType(v) !== '') {
            boolArr.push(this.setBooleanType(v))
          }
          return boolArr
        })
        return boolArr
      } else if (type === 'stringArray') {
        const arr = parameter.split(',')
        return arr
      } else if (type === 'intArray') {
        const arr = parameter.split(',')
        const iArr = []
        arr.map((v, i) => {
          return iArr.push(this.setIntType(v))
        })
        return iArr
      }
    },
    setBooleanType (str) {
      if (str === 'true') {
        return true
      } else if (str === 'false') {
        return false
      } else {
        return ''
      }
    },
    setIntType (para) {
      return parseInt(para)
    },
    removeParameter (index) {
      this.parameters.splice(index, 1)
      this.saveParameterInTask()
    },
    removeTest (index) {
      this.tests.splice(index, 1)
      this.saveTestsInTask()
    },
    setTestParameterArray (array) {
      const paraArr = []
      array.map((v, i) => {
        return paraArr.push({ parameter: v })
      })
      return paraArr
    },
    showTypeForSelectedId (index) {
      let parameter = ''
      this.parameters.map((v, i) => {
        if (i === index) {
          parameter = v.type.type
        }
        return parameter
      })
      return parameter
    }
  }
}
</script>
