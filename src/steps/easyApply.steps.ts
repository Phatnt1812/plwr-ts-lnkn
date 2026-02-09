import { Given, When, Then } from '@cucumber/cucumber';
import { page } from './hooks';
import { JobsPage } from '../pages/jobsPage';
import { EasyApplyPage } from '../pages/easyApplyModal';

const jobsPage = () => new JobsPage(page);
const easyApplyPage = () => new EasyApplyPage(page);

Given('user is on LinkedIn Jobs page', async () => {
  await jobsPage().openJobs();
});

When('user searches for Easy Apply job', async () => {
  await jobsPage().clickEasyApplyJob();
});

When('user opens Easy Apply form', async () => {
  await jobsPage().openEasyApply();
});

Then('required fields should be displayed', async () => {
  await easyApplyPage().validateRequiredFields();
});

Then('submit button should be disabled', async () => {
  await easyApplyPage().validateSubmitDisabled();
});
