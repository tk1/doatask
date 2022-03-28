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
                v-if="showParamError.includes(i) && showParamErrorTestNumber.includes(index)"
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
              v-if="showOutputError.includes(index)"
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
      showParamError: [],
      showOutputError: [],
      showParamErrorTestNumber: []
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

      this.tests.map((v, ind) => {
        parameterArr = []
        v.testParameter.map((x, i) => {
          return this.parameters.map((p, index) => {
            if (i === index) {
              if (p.type.type !== undefined && x.parameter === '') {
                this.fillEmptyField(p.type.type, i)
              }
              return parameterArr.push(this.setTestParameterType(p.type.type, x.parameter, i, ind))
            }
            return parameterArr
          })
        })

        const expectedOutput = this.setExpectedOutputType(this.currentReturnType.returnType, v.expectedOutput, ind)

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
        return this.pubTests
      })

      this.task.details.testSuite = { publicTests: this.pubTests, secretTests: this.secTests }
      console.log(this.task.details.testSuite)
    },
    setTestParameterType (type, parameter, indexTestParameter, indexTest) {
      // excludes duplicate entries
      this.removeErrorIndex(indexTestParameter, indexTest)
      switch (type) {
        case 'boolean': {
          const bool = this.setBooleanType(parameter)
          if (bool === null) {
            this.showParamError.push(indexTestParameter)
            this.showParamErrorTestNumber.push(indexTest)
          } else {
            this.removeErrorIndex(indexTestParameter, indexTest)
          }
          return bool
        }
        case 'string': {
          const str = this.splitEnteredString(parameter)
          if (str === null) {
            this.showParamError.push(indexTestParameter)
            this.showParamErrorTestNumber.push(indexTest)
          } else {
            this.removeErrorIndex(indexTestParameter, indexTest)
            return str
          }
        }
          break
        case 'int': {
          const number = this.setIntType(parameter)
          if (number === null) {
            this.showParamError.push(indexTestParameter)
            this.showParamErrorTestNumber.push(indexTest)
          } else {
            this.removeErrorIndex(indexTestParameter, indexTest)
            return number
          }
        }
          break
        case 'booleanArray': {
          const boolArr = []
          if (parameter === '[]') {
            this.removeErrorIndex(indexTestParameter, indexTest)
            return boolArr
          } else {
            parameter = this.splitArrayToString(parameter)
            if (parameter !== null) {
              this.removeErrorIndex(indexTestParameter, indexTest)
              if (parameter.includes(',')) {
                const arr = parameter.split(',')
                this.removeErrorIndex(indexTestParameter, indexTest)
                arr.map(v => {
                  if (this.setBooleanType(v) !== null) {
                    boolArr.push(this.setBooleanType(v))
                  } else {
                    this.showParamError.push(indexTestParameter)
                    this.showParamErrorTestNumber.push(indexTest)
                  }
                  return boolArr
                })
              } else {
                if (this.setBooleanType(parameter) !== null) {
                  this.removeErrorIndex(indexTestParameter, indexTest)
                  boolArr.push(this.setBooleanType(parameter))
                } else {
                  this.showParamError.push(indexTestParameter)
                  this.showParamErrorTestNumber.push(indexTest)
                }
              }
              return boolArr
            } else {
              this.showParamError.push(indexTestParameter)
              this.showParamErrorTestNumber.push(indexTest)
            }
          }
        }
          break
        case 'stringArray': {
          const strArr = []
          if (parameter === '[]') {
            this.removeErrorIndex(indexTestParameter, indexTest)
            return strArr
          } else {
            parameter = this.splitArrayToString(parameter)
            if (parameter !== null) {
              this.removeErrorIndex(indexTestParameter, indexTest)
              if (parameter.includes(',')) {
                parameter = parameter.split(',')
                this.removeErrorIndex(indexTestParameter, indexTest)
                parameter.map(v => {
                  if (this.splitEnteredString(v) !== null) {
                    return strArr.push(this.splitEnteredString(v))
                  } else {
                    this.showParamError.push(indexTestParameter)
                    this.showParamErrorTestNumber.push(indexTest)
                  }
                })
              } else {
                if (this.splitEnteredString(parameter) !== null) {
                  this.removeErrorIndex(indexTestParameter, indexTest)
                  strArr.push(this.splitEnteredString(parameter))
                } else {
                  this.showParamError.push(indexTestParameter)
                  this.showParamErrorTestNumber.push(indexTest)
                }
              }
              return strArr
            } else {
              this.showParamError.push(indexTestParameter)
              this.showParamErrorTestNumber.push(indexTest)
            }
          }
        }
          break
        case 'intArray': {
          const iArr = []
          if (parameter === '[]') {
            return iArr
          } else {
            parameter = this.splitArrayToString(parameter)
            if (parameter !== null) {
              this.removeErrorIndex(indexTestParameter, indexTest)
              if (parameter.includes(',')) {
                const arr = parameter.split(',')
                this.removeErrorIndex(indexTestParameter, indexTest)
                arr.map(v => {
                  if (this.setIntType(v) !== null) {
                    return iArr.push(this.setIntType(v))
                  } else {
                    this.showParamError.push(indexTestParameter)
                    this.showParamErrorTestNumber.push(indexTest)
                  }
                })
              } else {
                if (this.setIntType(parameter) !== null) {
                  this.removeErrorIndex(indexTestParameter, indexTest)
                  iArr.push(this.setIntType(parameter))
                } else {
                  this.showParamError.push(indexTestParameter)
                  this.showParamErrorTestNumber.push(indexTest)
                }
              }
              return iArr
            } else {
              this.showParamError.push(indexTestParameter)
              this.showParamErrorTestNumber.push(indexTest)
            }
          }
          break
        }
      }
    },
    setExpectedOutputType (type, parameter, index) {
      this.removeOutputErrorIndex(index)
      switch (type) {
        case 'boolean': {
          const bool = this.setBooleanType(parameter)
          if (bool === null) {
            this.showOutputError.push(index)
          } else {
            this.removeOutputErrorIndex(index)
          }
          return bool
        }
        case 'string': {
          const str = this.splitEnteredString(parameter)
          if (str === null) {
            this.showOutputError.push(index)
          } else {
            this.removeOutputErrorIndex(index)
            return str
          }
        }
          break
        case 'int': {
          const number = this.setIntType(parameter)
          if (number === null) {
            this.showOutputError.push(index)
          } else {
            this.removeOutputErrorIndex(index)
            return number
          }
        }
          break
        case 'booleanArray': {
          const boolArr = []
          if (parameter === '[]') {
            this.removeOutputErrorIndex(index)
            return boolArr
          } else {
            parameter = this.splitArrayToString(parameter)
            if (parameter !== null) {
              this.removeOutputErrorIndex(index)
              if (parameter.includes(',')) {
                const arr = parameter.split(',')
                this.removeOutputErrorIndex(index)
                arr.map(v => {
                  if (this.setBooleanType(v) !== null) {
                    boolArr.push(this.setBooleanType(v))
                  } else {
                    this.showOutputError.push(index)
                  }
                  return boolArr
                })
              } else {
                if (this.setBooleanType(parameter) !== null) {
                  this.removeOutputErrorIndex(index)
                  boolArr.push(this.setBooleanType(parameter))
                } else {
                  this.showOutputError.push(index)
                }
              }
              return boolArr
            } else {
              this.showOutputError.push(index)
            }
          }
        }
          break
        case 'stringArray': {
          const strArr = []
          if (parameter === '[]') {
            this.removeOutputErrorIndex(index)
            return strArr
          } else {
            parameter = this.splitArrayToString(parameter)
            if (parameter !== null) {
              this.removeOutputErrorIndex(index)
              if (parameter.includes(',')) {
                parameter = parameter.split(',')
                this.removeOutputErrorIndex(index)
                parameter.map(v => {
                  if (this.splitEnteredString(v) !== null) {
                    return strArr.push(this.splitEnteredString(v))
                  } else {
                    this.showOutputError.push(index)
                  }
                })
              } else {
                if (this.splitEnteredString(parameter) !== null) {
                  this.removeOutputErrorIndex(index)
                  strArr.push(this.splitEnteredString(parameter))
                } else {
                  this.showOutputError.push(index)
                }
              }
              return strArr
            } else {
              this.showOutputError.push(index)
            }
          }
        }
          break
        case 'intArray': {
          const iArr = []
          if (parameter === '[]') {
            this.removeOutputErrorIndex(index)
            return iArr
          } else {
            parameter = this.splitArrayToString(parameter)
            if (parameter !== null) {
              this.removeOutputErrorIndex(index)
              if (parameter.includes(',')) {
                const arr = parameter.split(',')
                this.removeOutputErrorIndex(index)
                arr.map(v => {
                  if (this.setIntType(v) !== null) {
                    return iArr.push(this.setIntType(v))
                  } else {
                    this.showOutputError.push(index)
                  }
                })
              } else {
                if (this.setIntType(parameter) !== null) {
                  this.removeOutputErrorIndex(index)
                  iArr.push(this.setIntType(parameter))
                } else {
                  this.showOutputError.push(index)
                }
              }
              return iArr
            } else {
              this.showOutputError.push(index)
            }
          }
        }
          break
      }
    },
    removeErrorIndex (indexTestParameter, indexTest) {
      if (this.showParamError.includes(indexTestParameter) && this.showParamErrorTestNumber.includes(indexTest)) {
        this.showParamError.splice(this.showParamError.indexOf(indexTestParameter), 1)
        this.showParamErrorTestNumber.splice(this.showParamErrorTestNumber.indexOf(indexTest), 1)
      }
    },
    removeOutputErrorIndex (indexTest) {
      if (this.showOutputError.includes(indexTest)) {
        this.showOutputError.splice(this.showOutputError.indexOf(indexTest), 1)
      }
    },
    splitArrayToString (arr) {
      // eslint-disable-next-line
      if (!(/^\[[^\[|\]]*\]$/.test(arr))) {
        return null
      } else {
        arr = arr.split('[')
        arr = arr[1].split(']')
        arr = arr[0].toString()
        return arr
      }
    },
    splitEnteredString (str) {
      if (!(/^"[^"]*"$/.test(str))) {
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
      if (isNaN(para)) {
        return null
      } else if (para.toString().includes(',') || para.toString().includes('.')) {
        return null
      } else {
        return parseInt(para)
      }
    },
    setDefaultTestParameter (type, index) {
      this.tests.map((v) => {
        v.testParameter.map((k, i) => {
          if (i === index) {
            k.parameter = this.setDefaultValue(type, this.task.details.language)
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
    setDefaultValue (type) {
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
        return array
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
