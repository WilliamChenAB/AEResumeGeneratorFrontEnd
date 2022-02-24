import Typography from '@mui/material/Typography';
import EmployeeSearchTable from '../components/Table/EmployeeSearchTable';
import PermissionsTable from '../components/Table/PermissionsTable';
import ResumeTable from '../components/Table/ResumeTable';
import TemplateTable from '../components/Table/TemplateTable';
import WorkspaceEmployeeTemplate from '../components/Table/WorkspaceEmployeeTable';
import WorkspaceTable from '../components/Table/WorkspaceTable';

function NerinePlayground() {
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
            <WorkspaceEmployeeTemplate />
            <WorkspaceTable />
        </div>
    );
}

export default NerinePlayground;