<template>
 <div>
   <div class="jumbotron jumbotron-fluid">
     <div class="container">
       <h3 class="display-5">{{job.positionName}}</h3>
       <h4>{{job.companyName}}</h4>
       <h5>{{job.cityName}}/{{job.townName}}</h5>
       <br>
       <b-img :src="job.imageUrl" class="img-fluid" blank-color="#ccc" alt="image" />
     </div>
   </div>

   <div class="container">
     <h5 class="font-weight-bold">İlan Durumu</h5>
     <p>{{job.durationDay}} gün önce yayınlandı ({{job.durationDayText}})</p>
     <br>
     <h5 class="font-weight-bold">Adres</h5>
     <p>{{job.address}}</p>
     <br>
     <h5 class="font-weight-bold">Açıklama</h5>
     <p>{{job.description}}</p>
   </div>
 </div>
</template>

<script>
//get data from json file
import JOBLIST from '../assets/data/joblist.json'

export default {
  name: 'JobDetail',
  data () {
    return {
      jobId: '',
      job: null
    }
  },
  created(){
    //Fetches job when the component is created.

    //Get jobId route param
    this.jobId = this.$route.params.id;

    if(this.jobId.trim().length > 0) {
      //map items
      this.job = JOBLIST.result.items
                 .filter(item => { return item.jobId === this.jobId })
                 .map(function (item) {
                   return {
                     "jobId": item.jobId,
                     "positionName": item.positionName,
                     "companyName": item.companyName,
                     "durationDay": item.durationDay,
                     "durationDayText": item.durationDayText,
                     "imageUrl": item.imageUrl,
                     "countryCode": item.countryCode,
                     "countryName": item.countryName,
                     "cityName": item.cityName,
                     "townName": item.townName,
                     "address": item.address,
                     "postalCode": item.postalCode,
                     "hasLatitude": item.hasLatitude,
                     "hasLongitude": item.hasLongitude,
                     "latitude": item.latitude.latitude,
                     "longitude": item.longitude,
                     "description": item.description,
                     "status": item.status,
                     "contactPhone": item.contactPhone
                   }
                 })[0];
    } else {
        alert("Unknown jobId")
    }
    console.log("job info ",this.job)
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
</style>
