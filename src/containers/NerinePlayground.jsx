import React from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import EmployeeSearchTable from '../components/Table/EmployeeSearchTable';
import PermissionsTable from '../components/Table/PermissionsTable';
import ResumeTable from '../components/Table/ResumeTable';
import TemplateTable from '../components/Table/TemplateTable';
import WorkspaceTable from '../components/Table/WorkspaceTable';
import TextBox from '../components/TextBox/TextBox';
import AddEmployee from '../containers/AddEmployee';

// TODO: replace mock data with BE data, id to be resume id

const rows = [
    { name: 'John Doe', id: '11111', role: 'Utility Coordination'},
    { name: 'James Johnson', id: '12345', role: 'Mechanical Engineer'},
    { name: 'Jane Doe', id: '22222', role: 'Project Administrator'},
    { name: 'Sarah Shaw', id: '23456', role: 'Bridge Designer'},
    { name: 'Nate Nichols', id: '34567', role: 'Bridge Designer'},
    { name: 'Marie McDonals', id: '45678', role: 'Bridge Designer'},
];

function NerinePlayground() {
    const [addEmployee, setAddEmployee] = useState(false);

    return (
        <div>
            <Typography variant="h1">Header 1</Typography>
            <Typography variant="h2">Header 2</Typography>
            <Typography variant="subtitle1">Subtitle 1</Typography>
            <Typography variant="subtitle2">Subtitle 2</Typography>
            <Typography variant="body1">Body1</Typography>
            <Typography variant="button">button</Typography>
            <EmployeeSearchTable />
            <PermissionsTable />
            <ResumeTable />
            <TemplateTable />
            <WorkspaceTable />
            <TextBox text='' rows={10}/>
            <TextBox text='test'/>
            <Button onClick={() => setAddEmployee(true)}>Add Employee</Button>
            <AddEmployee open={addEmployee} onClose={() => setAddEmployee(false)} data={rows} />
        </div>
    );
}

export default NerinePlayground;