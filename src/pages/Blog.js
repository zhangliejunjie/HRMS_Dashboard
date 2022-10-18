import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography, Modal } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

import { faker } from '@faker-js/faker';
import {
  AppNewsUpdate,
} from '../sections/@dashboard/app';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { useState } from 'react';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import * as React from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// Kiet import ModalEditor
import CampaignModalEditor from 'src/sections/@dashboard/blog/CampaignModalEditor';
import axios from 'axios';
import CampaignCreateModal from 'src/sections/@dashboard/blog/CampaignCreateModal';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];


// ----------------------------------------------------------------------

export default function Blog() {
  const [value1, setValue1] = React.useState(null);
  const [value2, setValue2] = React.useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleOpenEditor = () => {
    setOpenEditor(true);
  };

  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  const [campaigns, setCampaigns] = useState([]);
  React.useEffect(() => {
    async function fetchCampaign() {
      const data = await axios.get("http://localhost:8000/api/campaign");
      const { campaigns } = data.data;
      console.log(campaigns);
      setCampaigns(campaigns);
    }
    fetchCampaign();
  }, [])

  const [jobs, setJobs] = useState([]);
  React.useEffect(() => {
    async function fetchJob() {
      const data = await axios.get("http://localhost:8000/api/job");
      const { jobs } = data.data;
      console.log(jobs);
      setJobs(jobs);
    }
    fetchJob();
  }, [])
  // const posts = [jobs.map((job, index) => ({
  //   id: job.id,
  //   cover: `/static/mock-images/covers/cover_${index + 1}.jpg`,
  //   name: job.name,
  //   description: POST_DES[index + 1],
  //   createdAt: faker.date.past(),
  //   view: faker.datatype.number(),
  //   comment: faker.datatype.number(),
  //   share: faker.datatype.number(),
  //   favorite: faker.datatype.number(),
  //   author: {
  //     name: faker.name.findName(),
  //     avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  //   },
  // }));

  return (
    <Page title="Dashboard: Blog">
      <Container>
        {/* Trang added form for add new campaign */}
        {/* <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '50ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic" label="Title" variant="standard" />
          <TextField id="standard-basic" label="Description" variant="standard" />
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start date"
            value={value1}
            onChange={(newValue) => {
              setValue1(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End date"
            value={value2}
            onChange={(newValue) => {
              setValue2(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider> */}

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Campaigns
          </Typography>

          <CampaignCreateModal></CampaignCreateModal>
        </Stack>

        {/* Dat  */}
        <Grid item xs={12} md={6} lg={8} mb={5} >
          <AppNewsUpdate
            title="Highlights"
            subheader="Choose campaign to display jobs below"
            list={campaigns.map((campaign, index) => ({
              id: campaign.id,
              title: campaign.title,
              description: campaign.description,
              image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
              // postedAt: faker.date.recent(),
              // Kiet add status 
              status: campaign.status,
              start_date: campaign.start_date,
              end_date: campaign.end_date,
              index: index,
            }))}
          />
        </Grid>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Jobs
          </Typography>

          <ProductFilterSidebar
            isOpenFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <Button variant="contained" component={RouterLink} to="/newJob" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Job
          </Button>

        </Stack>
        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack> */}

        {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack> */}
        {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
              
            />
           
          </Grid> */}




        <Grid container spacing={3}>
          {jobs.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}

        </Grid>

      </Container>
    </Page>
  );
}
