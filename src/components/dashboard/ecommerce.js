import React, { Fragment, useEffect , useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import DataTable3 from '../tables/DataTable3'
import { Chart, registerables } from 'chart.js'
import axios from 'axios'
import ReactHighcharts from 'react-highcharts';
import { getUser } from '../../Utils/common';


Chart.register(...registerables)
const Ecommerce = () => {
  const [posts, setPosts] = useState([]);
  const [posts2, setPosts2] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`https://flyworex.azurewebsites.net/api/Graphs/GetApdTopTabs?username=${getUser().username}`)
      const res2 = await axios.get(`https://flyworex.azurewebsites.net/api/Graphs/GetMmuPercentage?username=${getUser().username}`)
      

      setPosts(res.data);
      
      setPosts2(res2.data);
      console.log(posts2)
    };
    fetchPosts()
  },[])

  var BarLabels = []
  var BarData = []
  var TimeStamps = []
  var timeData = []
  var editedtimestamps = []
  posts.map((post)=>{
    BarLabels = [...BarLabels,post.mainWindowTitle.slice(0,15)]
    BarData = [...BarData,post.count]
    
  })
  posts2.map((post)=>{
    TimeStamps = [...TimeStamps,post.sampleTime]
    timeData = [...timeData,post.machineMemoryUtilizationPercentage]
    
  })
  TimeStamps.map((stamp)=>{
    editedtimestamps = [...editedtimestamps,new Date(stamp).toDateString().slice(0,10)]
    console.log(editedtimestamps)
  })
 
    
    var newpiedata=[]
    var totalusages=0
    posts.map(post=>{
        totalusages+= post.count
    })
 console.log(posts)
    posts.map(post=>{
       var newobj={
            name:post.mainWindowTitle.slice(0,15),
            y:post.count/totalusages
        }
        newpiedata=[...newpiedata,newobj]
    })
    const opt = {
      chart:{
          type:'column'
      },
      title:{
          text:'top apps opened by employees'
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
    type: 'pie'
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


const newline= {
  events: {
    load() {
      setTimeout(this.reflow.bind(this), 0);
    }},

  title: {
      text: 'RealTime Performance Monitoring'
  },

  xAxis: {
    categories:editedtimestamps
  },

  legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
  },

  

  series: [{
    labels:editedtimestamps,
      name: 'Memory Utilization',
      data: timeData
  }],

  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }

}
    const active = ['#','Process Name','Average Active Process Memory', 'Average Active Process CPU']

  return (
    <Fragment>
      <Breadcrumb title="ItManager" parent="Dashboard" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5 >Real time performance monitoring</h5>
              </div>
              <div className="card-body">
              <ReactHighcharts config={newline}></ReactHighcharts>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Active Process Details</h5>
              </div>
              <div className="card-body">
              <DataTable3 title={"Active Processes Details"} fields={active}></DataTable3>

              </div>
            </div>
          </div>
        </div>

        <div className="row">
                    <div className="col-lg-6 col-sm-12 ">
                        <div className="card">
                        <div className="card-header">
                                <h5>Top Applications opened By browsers</h5>
                            </div>
                            <div className="card-body">
                            <ReactHighcharts config={opt}></ReactHighcharts>
           
        
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 ">
                        <div className="card">
                        <div className="card-header">
                                <h5>Top taps percentage opened</h5>
                            </div>
                            <div className="card-body">
                            <ReactHighcharts config={pieopt}></ReactHighcharts> 
                            </div>
                        </div>
                    </div>
                </div>

      </div>
    </Fragment>
  );
};

export default Ecommerce;