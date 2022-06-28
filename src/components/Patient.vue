<template>
  <el-row :gutter="10" style="height: 95%">
    <el-col :span="12" class="patient-pane">
      <el-table
        :data="filterPatientData"
        style="width: 100%"
        highlight-current-row
        @current-change="handleSelect"
      >
        <el-table-column label="id" prop="id" />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="性别" prop="sex" />
        <el-table-column label="年龄" prop="age" />
        <el-table-column label="备注" prop="info" />
        <el-table-column align="right" width="200">
          <template #header>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-input
                  v-model="patientSearch"
                  size="small"
                  placeholder="Type to search"
                />
              </el-col>
              <el-col :span="6">
                <el-button size="small" @click="handlePatientGet()"
                  >查找</el-button
                >
              </el-col>
              <el-col :span="6">
                <el-button size="small" @click="handlePatientAdd()"
                  >增加</el-button
                >
              </el-col>
            </el-row>
          </template>
          <template #default="scope">
            <el-button
              size="small"
              @click="handlePatientEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handlePatientDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical" style="height: 100%" />
    </el-col>
    <el-col :span="11" class="case-pane">
      <el-table
        :data="filterCaseData"
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column label="时间" prop="time" />
        <el-table-column label="就诊医院" prop="hospital" />
        <el-table-column label="就诊结果" prop="result" />
        <el-table-column align="right" width="200">
          <template #header>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-input
                  v-model="caseSearch"
                  size="small"
                  placeholder="Type to search"
                />
              </el-col>
              <el-col :span="6">
                <el-button size="small" @click="handleCaseAdd()"
                  >增加</el-button
                >
              </el-col>
            </el-row>
          </template>
          <template #default="scope">
            <el-button
              size="small"
              @click="handleCaseEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleCaseDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table></el-col
    >
  </el-row>
  <el-dialog
    v-model="dialogPatientVisible"
    :title="addFlag ? '病例增加' : '病例编辑'"
    width="30%"
  >
    <el-form :model="patientFormData" label-width="80px">
      <el-form-item label="id">
        <el-input v-model="patientFormData.id" placeholder="id"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="patientFormData.name" placeholder="name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="patientFormData.sex" placeholder="sex"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="patientFormData.age" placeholder="age"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="patientFormData.info" placeholder="info"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogPatientVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePatientConfrim">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="dialogCaseVisible"
    :title="addFlag ? '病例增加' : '病例编辑'"
    width="30%"
  >
    <el-form :model="caseFormData" label-width="80px">
      <el-form-item label="时间">
        <el-input v-model="caseFormData.time" placeholder="time"></el-input>
      </el-form-item>
      <el-form-item label="就诊医院">
        <el-input
          v-model="caseFormData.hospital"
          placeholder="hospital"
        ></el-input>
      </el-form-item>
      <el-form-item label="就诊结果">
        <el-input
          v-model="caseFormData.result"
          placeholder="result"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogCaseVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCaseConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { computed, reactive, ref, toRaw } from "vue";
import { http } from "../js/back_post";
import { Patient, Case } from "../js/patient";

const patientList = reactive([]);
const patientSearch = ref("");
const caseSearch = ref("");
const dialogPatientVisible = ref(false);
const addFlag = ref(false);
const patientFormData = ref(new Patient());
const dialogCaseVisible = ref(false);
const caseFormData = ref(new Case());
let selectedPatient = ref(new Patient());
const caseList = computed(() => {
  return selectedPatient.value.caseList;
});

function handleSelect(row) {
  if (row && row.caseList) {
    // caseList.value = row.caseList;
    selectedPatient.value = row;
  }
}
function handlePatientAdd() {
  addFlag.value = true;
  dialogPatientVisible.value = true;
  patientFormData.value = new Patient();
}
function handlePatientConfrim() {
  if (patientFormData.value.id) {
    if (addFlag.value) {
      http
        .post("/api/patient/add", JSON.stringify(toRaw(patientFormData.value)))
        .then((response) => {
          ElMessage({
            type: "success",
            message: response.msg,
          });
          patientList.push(toRaw(patientFormData.value));
        })
        .then(() => {
          dialogPatientVisible.value = false;
        });
    } else {
      http
        .post(
          "/api/patient/update",
          JSON.stringify(toRaw(patientFormData.value))
        )
        .then((response) => {
          ElMessage({
            type: "success",
            message: response.msg,
          });
          patientList[
            patientList.findIndex((p) => p.id === patientFormData.value.id)
          ] = toRaw(patientFormData.value);
        })
        .then(() => {
          dialogPatientVisible.value = false;
        });
    }
  }
}
function handlePatientGet() {
  http
    .post("/api/patient/get", {
      patient_id: patientSearch.value,
    })
    .then((response) => {
      if ((response.code = "200")) {
        const index = patientList.findIndex(p=>p.id===response.data.id)
        if(index>-1){
          patientList[index] = response.data
        }else{
          patientList.push(response.data);
        }
        ElMessage({
          type: "success",
          message: response.msg,
        });
      } else {
        ElMessage({
          type: "warning",
          message: response.msg,
        });
      }
    })
    .then(() => {
      patientSearch.value = "";
    });
}
function handlePatientEdit(index, raw) {
  addFlag.value = false;
  dialogPatientVisible.value = true;
  patientFormData.value = raw;
}
function handlePatientDelete(index, raw) {
  ElMessageBox.alert("确定删除？", "删除", {
    confirmButtonText: "确定",
    callback: (action) => {
      if (action === "confirm") {
        http
          .post("/api/patient/delete", {
            patient_id: raw.id,
          })
          .then((response) => {
            ElMessage({
              type: "success",
              message: response.msg,
            });
            let index = patientList.findIndex(
              (p) => p.id === patientFormData.value.id
            );
            patientList.splice(index, 1);
          });
      }
    },
  });
}

function handleCaseConfirm() {
  if (caseFormData.value.time) {
    http
      .post("/api/case/update", {
        patient_id: selectedPatient.value.id,
        data: toRaw(caseFormData.value),
      })
      .then((response) => {
        if (addFlag.value) {
          selectedPatient.value.caseList.push(toRaw(caseFormData.value));
        } else {
          let index = selectedPatient.value.caseList.findIndex(
            (p) => p.time === caseFormData.value.time
          );
          selectedPatient.value.caseList[index] = toRaw(caseFormData.value);
        }
        ElMessage({
          type: "success",
          message: response.msg,
        });
      })
      .then(() => {
        dialogCaseVisible.value = false;
      });
  }
}

function handleCaseAdd() {
  addFlag.value = true;
  dialogCaseVisible.value = true;
  caseFormData.value = new Case();
}
function handleCaseEdit(index, raw) {
  addFlag.value = false;
  dialogCaseVisible.value = true;
  caseFormData.value = raw;
}
function handleCaseDelete(index, raw) {
  ElMessageBox.alert("确定删除？", "删除", {
    confirmButtonText: "确定",
    callback: (action) => {
      if (action === "confirm") {
        http
          .post("/api/case/delete", {
            patient_id: selectedPatient.value.id,
            data: raw,
          })
          .then((response) => {
            ElMessage({
              type: "success",
              message: response.msg,
            });
            let index = selectedPatient.value.caseList.findIndex(
              (p) => p.time === caseFormData.value.time
            );
            selectedPatient.value.caseList.splice(index, 1);
          });
      }
    },
  });
}

const filterPatientData = computed(() => {
  const s = patientSearch.value.toLowerCase();
  return patientList.filter(
    (data) =>
      !s ||
      data.id.toLowerCase().includes(s) ||
      data.name.toLowerCase().includes(s) ||
      data.sex.toLowerCase().includes(s) ||
      data.info.toLowerCase().includes(s) ||
      data.age.toLowerCase().includes(s)
  );
});

const filterCaseData = computed(() => {
  const s = caseSearch.value.toLowerCase();
  return caseList.value.filter(
    (data) =>
      !s ||
      data.time.toLowerCase().includes(s) ||
      data.hospital.toLowerCase().includes(s) ||
      data.result.toLowerCase().includes(s)
  );
});
</script>

<style scoped></style>
