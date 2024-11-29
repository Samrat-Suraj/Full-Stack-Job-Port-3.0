import React from 'react';
import JobCard from './JobCard';
import { useSelector } from 'react-redux';

const HomePageJob = () => {
  const {allJobs} = useSelector(store => store.job)
  // const {}

  return (
    <div className=" mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Recent Jobs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          allJobs?.slice(0,6).map((jobs) => {
            return (
              <JobCard key={jobs?._id} jobs={jobs} />
            )
          })
        }
      </div>
    </div>
  );
}

export default HomePageJob;
