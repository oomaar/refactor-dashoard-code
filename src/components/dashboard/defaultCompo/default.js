import React, { Fragment , useState , useEffect } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import DataTable from '../../tables/DataTable';
import DataTable1 from '../../tables/DataTable1';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts';
import axios from 'axios'
import { Bar , Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'
import { getUser } from '../../../Utils/common';
import '../../../app.css'
Chart.register(...registerables)

const Default = () => {
    const [posts, setPosts] = useState([]);
    const [posts2, setposts2] = useState([])
    const [post3,setpost3] = useState([])
    const [stackedlabels , enablestackedlabels] = useState(true)
    useEffect(() => {
        if(window.innerWidth<=700){
            enablestackedlabels(!stackedlabels)
        }
        const fetchPosts = async () => {
          const res = await axios.get(`https://flyworex.azurewebsites.net/api/Graphs/GetApdTopUtil?username=${getUser().username}`)
          const res2 = await axios.get('https://flyworex.azurewebsites.net/api/Graphs/GetApdAppUsage?day=2021-11-22T00%3A00%3A00.000Z ')
          const res3 = await axios.get('https://my-json-server.typicode.com/WorexEG/json-server/usage')  
          setposts2(res2.data)
          setPosts(res.data);
          setpost3(res3.data)
        };
        fetchPosts()
      },[])
      var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
            '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
            '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
            '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
            '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
            '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
            '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
            '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
            '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
            '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    var stackedbarlablels = ['12 am' , '1 am' , '2 am' , '3 am','4 am', '5 am' , '6 am' , '7 am' , '8 am' , '9 am' , '10 am' , '11 am', '12 pm','1 pm','2 pm', '3 pm' , '4 pm','5 pm','6 pm','7 pm','8 pm','9 pm' , '10 pm','11 pm']
    var stackedbardata = []
    var BarLabels =[]
    var BarData = []
    var x = 0;
  
    posts.map((post)=>{
        BarLabels=[...BarLabels , post.processName]
      BarData = [...BarData,post.numberOfApp]
      
    })
    let filter_date = new Date(2021, 10, 22,2);
    let end_of_day = new Date(filter_date)
    end_of_day.setDate(end_of_day.getDate() + 1)
    let dict = {}
    let workingHoursPerDay = 24
    posts2.forEach(currentElement => {
            let applicationName = currentElement.applicationName
            let startTime = new Date(currentElement.applicationUtilizationStart)
            let endTime = new Date(currentElement.applicationUtilizationEnd)
            if (filter_date > startTime) startTime = filter_date
            if (end_of_day < endTime) endTime = end_of_day
            if (dict[applicationName] === undefined) {
                dict[applicationName] = Array(workingHoursPerDay).fill(null)
            }
            let durationMinutes = Math.abs(startTime - endTime) / (1000 * 60);
            let currentMinutes = startTime.getMinutes() + startTime.getSeconds() / 60 + startTime.getMilliseconds() / (60 * 60)
            let currentHours = startTime.getHours()
            while (durationMinutes > 0 && currentHours < workingHoursPerDay) {
                let takeMinutes = Math.min(60 - currentMinutes, durationMinutes)
                durationMinutes -= takeMinutes
                dict[applicationName][currentHours] += takeMinutes
                currentHours++
                currentMinutes = 0

            }

            while (durationMinutes > 0 && currentHours < workingHoursPerDay) {
                let remainingMinutesInHour = 60 - currentMinutes
                let takeMinutes = 0
                let fillHour = currentHours
                if (remainingMinutesInHour < durationMinutes) {
                    takeMinutes = remainingMinutesInHour
                    currentHours++
                    currentMinutes = 0
                } else {
                    takeMinutes = durationMinutes
                    currentMinutes += takeMinutes
                }
                durationMinutes -= takeMinutes
                dict[applicationName][fillHour] += takeMinutes
            }

        }
    )
    let series = []
    Object.keys(dict).map(function (key) {
        series.push({
            "name": key,
            "data": dict[key],
            "durationSum": dict[key].reduce((a, b) => a + b, 0)
        })
    });
    series.sort(function (first, second) {
        return second["durationSum"] - first["durationSum"];
    });
    const maxNumberOfElements = 10
    let chartSeries = series.slice(0, maxNumberOfElements);
    if (maxNumberOfElements < series.length) {

        let OtherDuration = Array(workingHoursPerDay).fill(null)
        for (let i = maxNumberOfElements; i < series.length; i++) {
            let currentDuration = series[i]["data"]
            OtherDuration = OtherDuration.map(function (num, idx) {
                return num + currentDuration[idx];
            });
        }
        chartSeries.unshift({
            "name": "Others",
            "data": OtherDuration
        })
    }
   
    chartSeries.map(arr=>{
        var temparr=[]
        var finalone=[]
        arr.data.map(el=>{
            temparr=[...temparr,Math.round(el*100)/100]
        })
        finalone=[...finalone,temparr]
        var obj = {
            name: arr.name,
            data:temparr        }
        stackedbardata=[...stackedbardata,obj]
    })
     var filtereddata = []
var droplistdata = []
 post3.map(el=>{
    var dataobj = {}
   el.data.map(sample=>{
       if(sample!==null && sample!==0){
            dataobj={
                hour:el.data.indexOf(sample),
                activity:el.name,
                duration:sample
            }
            filtereddata=[...filtereddata,dataobj]
    }
      
    })
})
var labels = []
for(var i=0;i<24;i++){
    var hourarr=[]
    var dataobj={}
    
    filtereddata.map(el=>{
        
        if(el.hour==i){
           if(el.hour=='0'){
                hourarr=[...hourarr,{hour:'12 am'}]
            }else if(el.hour=='1'){
                hourarr=[...hourarr,{hour:'1 am'}]
            }else if(el.hour=='2'){
                hourarr=[...hourarr,{hour:'2 am'}]
            }else if(el.hour=='3'){
                hourarr=[...hourarr,{hour:'3 am'}]
            }else if(el.hour=='4'){
                hourarr=[...hourarr,{hour:'4 am'}]
            }else if(el.hour=='5'){
                hourarr=[...hourarr,{hour:'5 am'}]
            }else if(el.hour=='6'){
                hourarr=[...hourarr,{hour:'6 am'}]
            }else if(el.hour=='7'){
                hourarr=[...hourarr,{hour:'7 am'}]
            }else if(el.hour=='8'){
                hourarr=[...hourarr,{hour:'8 am'}]
            }else if(el.hour=='9'){
                hourarr=[...hourarr,{hour:'9 am'}]
            }else if(el.hour=='10'){
                hourarr=[...hourarr,{hour:'10 am'}]
            }else if(el.hour=='11'){
                hourarr=[...hourarr,{hour:'11 am'}]
            }else if(el.hour=='12'){
                hourarr=[...hourarr,{hour:'12 pm'}]
            }else if(el.hour=='13'){
                hourarr=[...hourarr,{hour:'1 pm'}]
            }else if(el.hour=='14'){
                hourarr=[...hourarr,{hour:'2 pm'}]
            }else if(el.hour=='15'){
                hourarr=[...hourarr,{hour:'3 pm'}]
            }else if(el.hour=='16'){
                hourarr=[...hourarr,{hour:'4 pm'}]
            }else if(el.hour=='17'){
                hourarr=[...hourarr,{hour:'5 pm'}]
            }else if(el.hour=='18'){
                hourarr=[...hourarr,{hour:'6 pm'}]
            }else if(el.hour=='19'){
                hourarr=[...hourarr,{hour:'7 pm'}]
            }else if(el.hour=='20'){
                hourarr=[...hourarr,{hour:'8 pm'}]
            }else if(el.hour=='21'){
                hourarr=[...hourarr,{hour:'9 pm'}]
            }else if(el.hour=='22'){
                hourarr=[...hourarr,{hour:'10 pm'}]
            }else if(el.hour=='23'){
                hourarr=[...hourarr,{hour:'11 pm'}]
            }
            dataobj={
                activity:el.activity,
                duration:el.duration
            }
            hourarr=[...hourarr , dataobj]
               
        }
    })
    labels=[...labels,...hourarr]
    droplistdata=[...droplistdata,hourarr]
}

const BarContent = {
      labels:BarLabels,
      datasets:[{
        label:'top apps used',
        backgroundColor:'#0d6efd',
        data:BarData
      }]
    }
   
    const PieContent={
      labels:BarLabels,
      datasets:[
        {
          label:'top apps percentage',
          backgroundColor:colorArray.splice(0,BarLabels.length),
          hoverBackgroundColor:colorArray.splice(BarLabels.length,BarLabels.length),
          data:BarData
        }
      ]
    }
    var totalusages=0
    posts.map(post=>{
        totalusages+= post.numberOfApp
    })
    var newpiedata=[]
    posts.map(post=>{
       var newobj={
            name:post.processName,
            y:post.numberOfApp/totalusages
        }
        newpiedata=[...newpiedata,newobj]
    })
    const opt = {
        chart:{
            type:'column',
            events: {
                load() {
                  setTimeout(this.reflow.bind(this), 0);
                }}
            
        },
        title:{
            text:'top apps by employees'
        },
        xAxis:{
            categories:BarLabels
        },
        series:[{name:'number of usages',data:BarData}]
    }


    const pieopt ={
        chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        events: {
            load() {
              setTimeout(this.reflow.bind(this), 0);
            }}
     
    },
    title: {
        text: 'top apps percentage'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'amount of usages',
        colorByPoint: true,
        data: newpiedata
    }]} 

console.log('piedata',newpiedata)
    const stackedopt= {
        chart: {
          type: 'column',
          events: {
            load() {
              setTimeout(this.reflow.bind(this), 0);
            }}
        },
        title: {
          text: 'app usage details'
        },
        xAxis: {
          categories: stackedbarlablels
        },
        yAxis: {
          min: 0,
          title: {
            text: 'activity'
          },
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
              color: ( // theme
                Highcharts.defaultOptions.title.style &&
                Highcharts.defaultOptions.title.style.color
              ) || 'gray'
            }
          }
        },
        legend: {
            enabled:stackedlabels,
          align:'right',
          x: -30,
          verticalAlign: 'top',
        layout: 'vertical',
          y: 25,
          
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
        },
        tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: false
            }
          }
        },
        series:post3}
        console.log(stackedbardata, post3)
      return (
        <Fragment>
            <Breadcrumb parent="Dashboard" title="resource mangment" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Application Usage Details</h5>
                            </div>
                            <div className="card-body">
                                <div className='input_container' style={{'display':'flex','justifyContent':'space-between'}}><input value={getUser().username} disabled></input><input value='1/13/2022' disabled></input></div>
                              <ReactHighcharts  containerProps={{ style: { height: "100%" } }} config={stackedopt}></ReactHighcharts>
                              <div className='drop-comp'> {droplistdata.map(el=>{
                                  var totalmin=0
                                   if(el[0]!==undefined){
                                    el.map(arr=>{
                                        if(!isNaN(arr.duration)){
                                            totalmin+= Math.round(arr.duration * 100) /100
                                        }
                                     //   console.log(arr.duration , totalmin)
                                    })
                                  return  <div className='drop-elem' onClick={(e)=>{
                                    var child = e.target.lastChild
                                    if(e.target.classList.contains('drop-elem')){
                                    if(child.classList.contains('active')){
                                        child.classList.remove('active')
                                        
                                        e.target.firstChild.firstChild.innerHTML='➤'
                                    }else{
                                        child.classList.add('active')
                                        e.target.firstChild.firstChild.innerHTML='▼'
                                    }}
                                    
                                }}><div className='drop-header'><span className='click' onClick={(e)=>{
                                    var child = e.target.parentNode.nextElementSibling
                                    if(child.classList.contains('active')){
                                        child.classList.remove('active')
                                        e.target.innerHTML= '➤'
                                    }else{
                                        child.classList.add('active')
                                        e.target.innerHTML='▼'
                                    }
                                    
                                    
                                    
                                }}>➤</span><h5>{el[0].hour} <span className='item'> {Math.round(totalmin * 100) /100}min</span></h5></div>
                                  <div className='drop-body'>
                                  {el.map(not=>{
                                       if(el!==[]){
                                           return<><p><span className='activty'>{not.activity}</span><span className='duration'>{not.duration===undefined?not.duration:`${Math.round(not.duration * 100) /100 }min`}</span></p></>
                                       }
                                   })}</div></div>
}})}
</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-sm-12 ">
                        <div className="card">
                        <div className="card-header">
                                <h5>Top Applications Used By Employees</h5>
                            </div>
                            <div className="card-body">
                     <ReactHighcharts config={opt}></ReactHighcharts>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 ">
                        <div className="card">
                        <div className="card-header">
                                <h5>Top Applications Precentage</h5>
                            </div>
                            <div className="card-body">
                               <ReactHighcharts config={pieopt}></ReactHighcharts>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-12'>
                    <div className="card">
                        <div className="card-header">
                                <h5>utilized application list</h5>
                            </div>
                         <div className="card-body">
                             <DataTable/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-12'>
                    <div className="card">
                        <div className="card-header">
                                <h5>Application Utilization Details</h5>
                            </div>
                            <div className="card-body">
                                <DataTable1/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Default;