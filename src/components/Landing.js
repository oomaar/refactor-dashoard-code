import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactHighcharts from 'react-highcharts';
import '../app.css';
import { HardwareData } from '.';

export const Landing = () => {
    // Requirments
    // Page split into 2 rows
    // Top Row: Application Performance
    // Bottom Row: Log Hardware Usage (CPU, Memory & Network)
    const [appPerformance, setAppPerformance] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`https://my-json-server.typicode.com/WorexEG/json-server/appPerformance`);
            setAppPerformance(res.data);
        };

        fetchData();
    }, []);

    let appPerformancePie = {};

    //creating the config object for each chart in the application performance
    const appPerformanceCharts = appPerformance.map((el, index) => {
        appPerformancePie = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: el.applicationName
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
                    size: 200,
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
                data: [{
                    name: el.applicationName,
                    y: el.successRate,
                }, {
                    name: 'failer rate',
                    y: el.failerRate
                }]
            }]
        }
        return <div key={index} className='col-lg-6  col-md-12'>
            <div className='card '>
                <div className='card-body'>
                    {<ReactHighcharts config={appPerformancePie}></ReactHighcharts>}
                </div>
            </div>
        </div>
    })

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className='card-header'>
                                Application Performance
                            </div>
                            <div className='card-body row'>
                                {/* maping through the app performance to create 4 pie charts*/}
                                {appPerformanceCharts}
                            </div>
                        </div>
                        {/* Hardware Performance */}
                        <HardwareData title="CPU Performance" data="cpuPerformance" />
                    </div>
                </div>
            </div>
        </>
    );
};