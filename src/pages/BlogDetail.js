import { faker } from '@faker-js/faker';
import { Container, Grid } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from 'src/components/Page';
import { AppNewsUpdate, AppOrderTimeline, AppWidgetSummary } from 'src/sections/@dashboard/app';
import { BlogPostCard } from 'src/sections/@dashboard/blog';
import Typography from 'src/theme/overrides/Typography';

export default function BlogDetail() {
  const params = useParams();
  const campaignId = params.id;
  const [jobs, setJobs] = useState([]);
  const [campaign, setCampaign] = useState([]);
  React.useEffect(() => {
    async function fetchJobs() {
      console.log(campaign);
      const data = await axios.post('http://localhost:8000/api/by-campaign', {
        campaignId: campaignId,
      });
      // try {
      //   setJobs(data.data);
      // } catch (error) {
      //   console.log(error);
      // }
    }
    fetchJobs();
  }, []);

  React.useEffect(() => {
    async function fetchCampaign() {
      const data = await axios.get(`http://localhost:8000/api/campaign/${campaignId}`);

      setCampaign(data.data);
    }
    fetchCampaign();
  }, []);
  return (
    <Page title="Campaign Detail">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <h1>{campaign.title}</h1>
            <div>{campaign.description}</div>
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            {jobs.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Jobs" total={1} icon={'ant-design:android-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Candidate" total={3} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Passed" total={2} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Not passed" total={1} color="error" icon={'ant-design:bug-filled'} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
