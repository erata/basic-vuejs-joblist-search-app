<template>
  <div>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">İlan Ara</h1>
        <br>
        <form>
            <div class="form-row justify-content-center align-items-center">
              <div class="col-sm-2 col-xs-3">
                <select v-model="selectedCity" class="form-control mb-2">
                  <option value="">Şehir</option>
                  <option v-for="cityName in filteredCityNames">{{ cityName }}</option>
                </select>
              </div>
              <div class="col-sm-6 col-xs-5">
                <input type="text" class="form-control mb-2" v-model="searchText" placeholder="Pozisyon, firma adı, sektör">
              </div>
              <div class="col-auto">
                <button type="button" class="btn btn-primary mb-2" @click="searchJobs">Search</button>
              </div>
            </div>
        </form>
      </div>
    </div>

    <div class="row">
      <div v-for="job in searchedjobList" class="col-sm-10 offset-sm-1 col-xs-12" style="margin-bottom: 10px">
        <router-link :to="{ name: 'JobDetail', params: { id: job.jobId }}">
        <div class="row job-item">
            <div class="col-sm-9 text-justify">
              <span>{{job.positionName}}</span>
              <br>
              <span>{{job.companyName}}</span>
              <br>
              <span class="font-weight-light text-muted">{{job.cityName}}/{{job.townName}}</span>
            </div>
            <div class="col-sm-3 text-right">
              <b-img :src="job.imageUrl" style="height:50px;"  blank-color="#ccc" alt="image" />
              <br>
              <span class="text-muted" style="font-size: smaller">{{job.durationDay}} gün önce</span>
            </div>

        </div>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
//get data from json file
import JOBLIST from '../assets/data/joblist.json'

export default {
  name: 'JobList',
  data() {
    return {
      selectedCity: '',
      searchText: '',
      jobList: [],
      searchedjobList: []
    }
  },

  created() {
    //Fetches jobs when the component is created.
    //this.jobList = this.searchedjobList = JOBLIST;

    //map items
    this.jobList  = JOBLIST.result.items
                    .map(function(item){
                        return {
                          "jobId":item.jobId,
                          "positionName":item.positionName,
                          "companyName":item.companyName,
                          "durationDay":item.durationDay,
                          "durationDayText":item.durationDayText,
                          "imageUrl":item.imageUrl,
                          "distance":item.distance,
                          "latitude":item.latitude,
                          "longitude":item.longitude,
                          "cityName":item.cityName,
                          "townName":item.townName
                        }
                    });

    this.searchedjobList = this.jobList;
  },
  methods: {
    searchJobs() {
      this.searchedjobList = this.jobList;

      //return all result if there is no input entry
      if( this.selectedCity === '' && this.searchText === ''){
        return this.searchedjobList;
      }

      //city has value
      if( this.selectedCity !== ''){
        this.searchedjobList = this.searchedjobList.filter(job => { return job.cityName === this.selectedCity })
      }

      //search text has value
      if( this.searchText !== ''){
        console.log(this.searchText,this.searchText.toLocaleLowerCase());
        this.searchedjobList = this.searchedjobList.filter(job => {
          return job.positionName.toLocaleLowerCase().indexOf(this.searchText.trim().toLocaleLowerCase()) > -1 || //for TR: to include ıöüşğİ
                 job.companyName.toLocaleLowerCase().indexOf(this.searchText.trim().toLocaleLowerCase()) > -1 ||  //for TR
                 job.positionName.toLowerCase().indexOf(this.searchText.trim().toLowerCase()) > -1 || //general
                 job.companyName.toLowerCase().indexOf(this.searchText.trim().toLowerCase()) > -1;  //general
        })
      }
     // console.log("FILTERED COUNT: ",this.searchedjobList.length," TOTAL COUNT: ",this.jobList.length,this.searchedjobList);
    },
  },
  computed : {
    filteredCityNames() {
      let unique_array = [];
      for(let i = 0;i < this.jobList.length; i++){
        if(unique_array.indexOf(this.jobList[i].cityName) == -1){
          unique_array.push(this.jobList[i].cityName)
        }
      }
      return unique_array
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.job-item{
  border: solid 1px lightgray; padding: 10px
}
.job-item:hover{
  background-color:#f3f3f3;
  cursor: pointer;
}

</style>
