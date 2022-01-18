import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactHighcharts from 'react-highcharts';
import DataTable6 from './tables/DataTable6';

export const HardwareData = ({ title, data }) => {
    const [hardwarePerformance, setHardwarePerformance] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`https://my-json-server.typicode.com/WorexEG/json-server/${data}`);
            setHardwarePerformance(res.data);
        };

        fetchData();
    });

    let hardwarePerformancePie = [];

    //mapping through the cpu performance data to change the proprties names
    hardwarePerformance.map(el => {
        var obj = {
            name: el.applicationName,
            y: el.percentage
        }
        hardwarePerformancePie = [...hardwarePerformancePie, obj]
        return 0;
    });

    //creating the config object for the cpu pie chart
    const hardwarePerformanceCharts = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: ''
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
                size: 250,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: hardwarePerformancePie
        }]
    };

    return (
        <div className='card'>
            <div className='card-header'>
                {title}
            </div>
            <div className='card-body row'>
                <div className='col-lg-6 col-md-12'>
                    <div className='card'>
                        <div className='card-body' style={{ 'height': '500px' }}>
                            {/* passing the table data to the table component to render it */}
                            <DataTable6 data={hardwarePerformance}></DataTable6>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6 col-md-12'>
                    <div className='card'>
                        <div className='card-body ' style={{ 'height': '500px' }}>
                            <ReactHighcharts config={hardwarePerformanceCharts}></ReactHighcharts>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};