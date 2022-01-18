import React, { Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';
import DataTable4 from '../tables/DataTable4';
import DataTable5 from '../tables/DataTable5';

const University = () => {
    return (
        <Fragment>
            <Breadcrumb parent="Dashboard" title="Assets" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Application Licence</h5>
                            </div>
                            <div className="card-body">
                                <DataTable4/>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h5>Application Capacity</h5>
                            </div>
                            <div className="card-body">
                                <DataTable5/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default University;