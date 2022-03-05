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
          <label for="functionName">Function</label>
          <InputText
            id="functionName"
            v-model="task.details.methodStub.functionName"
            type="text"
            autocomplete="off"
          />
        </div>
        <div class="p-field p-col-12 p-md-2">
          <label for="returnType">Return Type</label>
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
      <div
        v-if="parameters.length === 0"
        class="p-field p-col-12 p-md-3"
      >
        <label>No parameters selected</label>
      </div>
      <template
        v-for="(parameter, index) in parameters"
        :key="index"
      >
        <div class="p-fluid p-grid p-formgrid">
          <div class="p-field p-col-12 p-md-2">
            <label for="parameterType">Type</label>
            <Dropdown
              id="parameterType"
              v-model="parameter.type"
              :options="typesForSelectedLanguage"
              option-label="type"
              placeholder="Select a type"
              @change="saveParameterInTask(index)"
            />
          </div>
          <div class="p-field p-col-12 p-md-2">
            <label for="parameter">Parameter</label>
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
            <label for="isSecretTest">Secret Test</label>
          </div>
          <div class="p-field p-col-12 p-md-5">
            <template
              v-for="(para, i) in test.testParameter"
              :key="i"
            >
              <label
                v-if="parameters.length !== 0"
                for="testParameter"
              >Type: {{ showTypeForSelectedId(i) }}, Parameter: {{ showNameForSelectedId(i) }}</label>
              <InputText
                v-if="parameters.length !== 0"
                id="testParameter"
                v-model="para.parameter"
                type="text"
                autocomplete="off"
                @change="saveTestsInTask"
              />
              <small
                v-if="showParameterError === i"
                id="testParameter-error"
                class="p-error"
              >Please enter correct type</small>
            </template>
          </div>
          <div class="p-field p-col-12 p-md-4">
            <label for="expectedOutput">Expected Output: {{ currentReturnType?.returnType }}</label>
            <InputText
              id="expectedOutput"
              v-model="test.expectedOutput"
              type="text"
              autocomplete="off"
              @change="saveTestsInTask"
            />
            <small
              v-if="showOutputError === index"
              id="expectedOutput-error"
              class="p-error"
            >Please enter correct type</small>
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
        { language: 'Python' }, { language: 'Java' }],
      parameters: [],
      tests: [],
      currentLanguage: null,
      currentReturnType: null,
      secTests: [],
      pubTests: [],
      showParameterError: '',
      showOutputError: ''
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

      this.task.details.testSuite = {
        publicTests: [],
        secretTests: []
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
      this.parameters = this.task.details.methodStub.parameter.map(v => ({
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

      if (this.task.details.testSuite.publicTests.length !== 0) {
        this.task.details.testSuite.publicTests.map(x => {
          return publicTest.push({
            isSecretTest: false,
            testParameter: this.setTestParameterArrayToCorrectForm(x.testParameter),
            expectedOutput: this.changedSavedValueToCorrectForm(x.expectedOutput, this.task.details.methodStub.returnType)
          })
        })

        for (let i = 0; i < publicTest.length; i++) {
          this.tests.push(publicTest[i])
        }
      }

      if (this.task.details.testSuite.secretTests.length !== 0) {
        this.task.details.testSuite.secretTests.map((x) => {
          return secretTest.push({
            isSecretTest: true,
            testParameter: this.setTestParameterArrayToCorrectForm(x.testParameter),
            expectedOutput: this.changedSavedValueToCorrectForm(x.expectedOutput, this.task.details.methodStub.returnType)
          })
        })

        for (let i = 0; i < secretTest.length; i++) {
          this.tests.push(secretTest[i])
        }
      }
    }
  },
  methods: {
    setTypeForParameter (e) {
      this.typesForSelectedLanguage = [
        { type: 'boolean' },
        { type: 'string' },
        { type: 'int' },
        { type: 'booleanArray' },
        { type: 'stringArray' },
        { type: 'intArray' }
      ]
    },
    setTypeForReturnType (e) {
      this.returnTypesForSelectedLanguage = [
        { returnType: 'boolean' },
        { returnType: 'string' },
        { returnType: 'int' },
        { returnType: 'booleanArray' },
        { returnType: 'stringArray' },
        { returnType: 'intArray' }
      ]
    },
    languageChanged (e) {
      this.task.details.language = e.value.language
      this.setTypeForParameter(e.value)
      this.setTypeForReturnType(e.value)
    },
    returnTypeChanged (e) {
      this.returnType = e.value
      this.task.details.methodStub.returnType = this.returnType.returnType
      this.setDefaultExpectedOutput()
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
        return arr.push({ parameter: this.setDefaultValue(v.type.type, this.task.details.language) })
      })

      this.tests.push({ isSecretTest: false, testParameter: arr, expectedOutput: this.setDefaultValue(this.task.details.methodStub.returnType, this.task.details.language) })
      this.saveTestsInTask()
    },
    saveParameterInTask (index) {
      this.task.details.methodStub.parameter = this.parameters.map(v => ({ name: v.name, type: v.type.type }))
      this.parameters.map((v, i) => {
        if (i === index) {
          this.setDefaultTestParameter(v.type.type, index)
        }
      })
    },
    saveTestsInTask () {
      this.secTests = []
      this.pubTests = []
      let parameterArr = []

      this.tests.map((v, index) => {
        parameterArr = []
        v.testParameter.map((x, i) => {
          return this.parameters.map((p, index) => {
            if (i === index) {
              if (p.type.type !== undefined && x.parameter === '') {
                this.fillEmptyField(p.type.type, i)
              }
              return parameterArr.push(this.setTestParameterType(p.type.type, x.parameter, i))
            }
            return parameterArr
          })
        })

        let expectedOutput = ''
        expectedOutput = this.setExpectedOutputType(this.currentReturnType.returnType, v.expectedOutput, index)

        if (v.expectedOutput === '') {
          v.expectedOutput = this.setEmptyValue(this.currentReturnType.returnType, this.task.details.language)
        }
        if (v.isSecretTest === true) {
          this.secTests.push({
            testParameter: parameterArr,
            expectedOutput: expectedOutput
          })
          return this.secTests
        } else if (v.isSecretTest === false) {
          this.pubTests.push({
            testParameter: parameterArr,
            expectedOutput: expectedOutput
          })
          return this.pubTests
        }
      })

      this.task.details.testSuite = { publicTests: this.pubTests, secretTests: this.secTests }
      console.log(this.task.details.testSuite)
    },
    setTestParameterType (type, parameter, index) {
      switch (type) {
        case 'boolean': {
          const bool = this.setBooleanType(parameter)
          if (bool === null) {
            this.showParameterError = index
          } else {
            this.showParameterError = ''
            return bool
          }
        }
          break
        case 'string': {
          const str = this.splitEnteredString(parameter)
          if (str === null) {
            this.showParameterError = index
          } else {
            this.showParameterError = ''
            return str
          }
        }
          break
        case 'int': {
          const number = this.setIntType(parameter)
          if (number === null) {
            this.showParameterError = index
          } else {
            this.showParameterError = ''
            return number
          }
        }
          break
        case 'booleanArray': {
          const boolArr = []
          if (parameter === '[]') {
            return boolArr
          } else {
            if (parameter.includes('[') && parameter.includes(']')) {
              this.showParameterError = ''
              parameter = this.splitArrayToString(parameter, index)
              if (parameter.includes(',')) {
                const arr = parameter.split(',')
                this.showParameterError = ''
                arr.map(v => {
                  if (this.setBooleanType(v) !== null) {
                    boolArr.push(this.setBooleanType(v))
                  } else {
                    this.showParameterError = index
                  }
                  return boolArr
                })
              } else {
                if (this.setBooleanType(parameter) !== null) {
                  this.showParameterError = ''
                  boolArr.push(this.setBooleanType(parameter))
                } else {
                  this.showParameterError = index
                }
              }
              return boolArr
            } else {
              this.showParameterError = index
            }
          }
        }
          break
        case 'stringArray': {
          const strArr = []
          if (parameter === '[]') {
            return strArr
          } else {
            if (parameter.includes('[') && parameter.includes(']')) {
              this.showParameterError = ''
              parameter = this.splitArrayToString(parameter, index)
              if (parameter.includes(',')) {
                parameter = parameter.split(',')
                this.showParameterError = ''
                parameter.map(v => {
                  if (this.splitEnteredString(v) !== null) {
                    return strArr.push(this.splitEnteredString(v))
                  } else {
                    this.showParameterError = index
                  }
                })
              } else {
                if (this.splitEnteredString(parameter) !== null) {
                  this.showParameterError = ''
                  strArr.push(this.splitEnteredString(parameter))
                } else {
                  this.showParameterError = index
                }
              }
              return strArr
            } else {
              this.showParameterError = index
            }
          }
        }
          break
        case 'intArray': {
          const iArr = []
          if (parameter === '[]') {
            return iArr
          } else {
            if (parameter.includes('[') && parameter.includes(']')) {
              this.showParameterError = ''
              parameter = this.splitArrayToString(parameter, index)
              if (parameter.includes(',')) {
                const arr = parameter.split(',')
                this.showParameterError = ''
                arr.map(v => {
                  if (this.setIntType(v) !== null) {
                    return iArr.push(this.setIntType(v))
                  } else {
                    this.showParameterError = index
                  }
                })
              } else {
                if (this.setIntType(parameter) !== null) {
                  this.showParameterError = ''
                  iArr.push(this.setIntType(parameter))
                } else {
                  this.showParameterError = index
                }
              }
              return iArr
            } else {
              this.showParameterError = index
            }
          }
        }
          break
      }
    },
    setExpectedOutputType (type, parameter, index) {
      switch (type) {
        case 'boolean': {
          const bool = this.setBooleanType(parameter)
          if (bool === null) {
            this.showOutputError = index
          } else {
            this.showOutputError = ''
            return bool
          }
        }
          break
        case 'string': {
          const str = this.splitEnteredString(parameter)
          if (str === null) {
            this.showOutputError = index
          } else {
            this.showOutputError = ''
            return str
          }
        }
          break
        case 'int': {
          const number = this.setIntType(parameter)
          if (number === null) {
            this.showOutputError = index
          } else {
            this.showOutputError = ''
            return number
          }
        }
          break
        case 'booleanArray': {
          const boolArr = []
          if (parameter === '[]') {
            return boolArr
          } else {
            if (parameter.includes('[') && parameter.includes(']')) {
              this.showOutputError = ''
              parameter = this.splitArrayToString(parameter, index)
              if (parameter.includes(',')) {
                const arr = parameter.split(',')
                this.showOutputError = ''
                arr.map(v => {
                  if (this.setBooleanType(v) !== null) {
                    boolArr.push(this.setBooleanType(v))
                  } else {
                    this.showOutputError = index
                  }
                  return boolArr
                })
              } else {
                if (this.setBooleanType(parameter) !== null) {
                  this.showOutputError = ''
                  boolArr.push(this.setBooleanType(parameter))
                } else {
                  this.showOutputError = index
                }
              }
              return boolArr
            } else {
              this.showOutputError = index
            }
          }
        }
          break
        case 'stringArray': {
          const strArr = []
          if (parameter === '[]') {
            return strArr
          } else {
            if (parameter.includes('[') && parameter.includes(']')) {
              this.showOutputError = ''
              parameter = this.splitArrayToString(parameter, index)
              if (parameter.includes(',')) {
                parameter = parameter.split(',')
                this.showOutputError = ''
                parameter.map(v => {
                  if (this.splitEnteredString(v) !== null) {
                    return strArr.push(this.splitEnteredString(v))
                  } else {
                    this.showOutputError = index
                  }
                })
              } else {
                if (this.splitEnteredString(parameter) !== null) {
                  this.showOutputError = ''
                  strArr.push(this.splitEnteredString(parameter))
                } else {
                  this.showOutputError = index
                }
              }
              return strArr
            } else {
              this.showOutputError = index
            }
          }
        }
          break
        case 'intArray': {
          const iArr = []
          if (parameter === '[]') {
            return iArr
          } else {
            if (parameter.includes('[') && parameter.includes(']')) {
              this.showOutputError = ''
              parameter = this.splitArrayToString(parameter, index)
              if (parameter.includes(',')) {
                const arr = parameter.split(',')
                this.showOutputError = ''
                arr.map(v => {
                  if (this.setIntType(v) !== null) {
                    return iArr.push(this.setIntType(v))
                  } else {
                    this.showOutputError = index
                  }
                })
              } else {
                if (this.setIntType(parameter) !== null) {
                  this.showOutputError = ''
                  iArr.push(this.setIntType(parameter))
                } else {
                  this.showOutputError = index
                }
              }
              return iArr
            } else {
              this.showOutputError = index
            }
          }
        }
          break
      }
    },
    splitArrayToString (arr) {
      // eslint-disable-next-line
      // const reg = '\[(.*)\]'
      const reg = ''
      const regex = new RegExp(reg, 'g')
      if (!regex.test(arr)) {
        return null
      } else {
        arr = arr.split('[')
        arr = arr[1].split(']')
        arr = arr[0].toString()
        return arr
      }
    },
    splitEnteredString (str) {
      const reg = '"(.*)"'
      const regex = new RegExp(reg, 'g')
      if (!regex.test(str)) {
        return null
      } else {
        str = str.split('"')
        return str[1]
      }
    },
    setBooleanType (str) {
      if (str === 'true' || str === true) {
        return true
      } else if (str === 'false' || str === false) {
        return false
      } else {
        return null
      }
    },
    setIntType (para) {
      if (isNaN(parseInt(para))) {
        return null
      } else {
        return parseInt(para)
      }
    },
    setDefaultTestParameter (type, index) {
      this.tests.map((v) => {
        return v.testParameter.map((k, i) => {
          if (i === index) {
            k.parameter = this.setDefaultValue(type, this.task.details.language)
            this.saveTestsInTask()
          }
        })
      })
    },
    setDefaultExpectedOutput () {
      const type = this.task.details.methodStub.returnType
      this.tests.map(k => {
        k.expectedOutput = this.setDefaultValue(type, this.task.details.language)
        this.saveTestsInTask()
      })
    },
    setDefaultValue (type, language) {
      if (type === 'boolean') {
        return false
      } else if (type === 'string') {
        return '"foo"'
      } else if (type === 'int') {
        return 0
      } else if (type === 'booleanArray') {
        return '[true,false]'
      } else if (type === 'stringArray') {
        return '["foo","bar"]'
      } else if (type === 'intArray') {
        return '[0, 1, 2, 3]'
      }
    },
    fillEmptyField (type, index) {
      this.tests.map((v) => {
        return v.testParameter.map((k, i) => {
          if (i === index) {
            k.parameter = this.setEmptyValue(type, this.task.details.language)
            this.saveTestsInTask()
          }
        })
      })
    },
    setEmptyValue (type) {
      if (type === 'boolean') {
        return false
      } else if (type === 'int') {
        return 0
      } else if (type === 'string') {
        return '""'
      } else if (type === 'booleanArray') {
        return '[]'
      } else if (type === 'stringArray') {
        return '[]'
      } else if (type === 'intArray') {
        return '[]'
      }
    },
    removeParameter (index) {
      this.parameters.splice(index, 1)
      this.tests.map((v, i) => {
        return v.testParameter.splice(index, 1)
      })
      this.saveParameterInTask()
      this.saveTestsInTask()
    },
    removeTest (index) {
      this.tests.splice(index, 1)
      this.saveTestsInTask()
    },
    setTestParameterArrayToCorrectForm (array) {
      const paraArr = []
      this.parameters.map((k, index) => {
        return array.map((v, i) => {
          if (index === i) {
            paraArr.push({ parameter: this.changedSavedValueToCorrectForm(v, k.type.type) })
          }
          return paraArr
        })
      })
      return paraArr
    },
    changedSavedValueToCorrectForm (array, type) {
      const paraArr = []
      if (type === 'stringArray') {
        const arr = []
        array.map((l) => {
          l = '"' + l + '"'
          arr.push(l)
          return arr
        })
        array = '[' + arr + ']'
      } else if (type === 'booleanArray') {
        array = '[' + array + ']'
      } else if (type === 'intArray') {
        array = '[' + array + ']'
      } else if (type === 'string') {
        array = '"' + array + '"'
      } else {
        return array
      }
      paraArr.push(array)
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
    },
    showNameForSelectedId (index) {
      let parameter = ''
      this.parameters.map((v, i) => {
        if (i === index) {
          parameter = v.name
        }
        return parameter
      })
      return parameter
    }
  }
}
</script>
