"use client"
// pages/resources.js
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Resources = () => {
  const [selectedVideo, setSelectedVideo] = useState(null); // State to store the selected video
  const [youtubeVideos, setYoutubeVideos] = useState([]); // State for YouTube videos

  // Fetch YouTube videos from the API
  useEffect(() => {
    const fetchYoutubeVideos = async () => {
      const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY; // Replace with your actual API key
      const query = 'mental health'; // Search query
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`
        );
        const data = await response.json();

        // Check if data.items exists before mapping
        if (data.items) {
          // Map the fetched videos to the desired format
          const videos = data.items.map(video => ({
            id: video.id.videoId,
            title: video.snippet.title,
            url: `https://www.youtube.com/embed/${video.id.videoId}`,
          }));

          setYoutubeVideos(videos);
        } else {
          console.error('No items found in the response:', data);
        }
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
      }
    };

    fetchYoutubeVideos();
  }, []);

  const resourceList = [
    {
      id: 1,
      title: 'National Alliance on Mental Illness (NAMI)',
      description: 'A national organization that offers support, education, and advocacy for individuals and families affected by mental illness.',
      link: 'https://www.nami.org',
    },
    {
      id: 2,
      title: 'Mental Health America (MHA)',
      description: 'Provides resources, information, and support for mental health and wellness.',
      link: 'https://www.mhanational.org',
    },
    {
      id: 3,
      title: 'Substance Abuse and Mental Health Services Administration (SAMHSA)',
      description: 'A resource for information and treatment for mental health and substance use disorders.',
      link: 'https://www.samhsa.gov',
    },
    {
      id: 4,
      title: 'Crisis Text Line',
      description: 'Free, 24/7 support for anyone in crisis. Text "HELLO" to 741741.',
      link: 'https://www.crisistextline.org',
    },
    {
      id: 5,
      title: 'Mindfulness-Based Stress Reduction (MBSR)',
      description: 'Learn about mindfulness and its benefits for mental health through structured programs.',
      link: 'https://www.umassmed.edu/cfm/mindfulness-based-programs/mbsr/',
    },
  ];

  const handleVideoSelect = (url) => {
    setSelectedVideo(url);
  };

  return (
    <>
      <Head>
        <title>Resources - Mental Health Assistant</title>
      </Head>

      <div className="bg-gray-50 min-h-screen pt-16 px-6 flex flex-col items-center">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Mental Health Resources</h1>
          <p className="text-gray-600 mb-4">Here are some valuable resources for mental health support:</p>

          <ul className="space-y-4 mb-8">
            {resourceList.map((resource) => (
              <li key={resource.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
                <h2 className="text-xl font-semibold text-gray-800">{resource.title}</h2>
                <p className="text-gray-600">{resource.description}</p>
                <Link href={resource.link} target="_blank">
                  <div className="text-blue-500 hover:underline">Visit</div>
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended YouTube Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {youtubeVideos.map((video) => (
              <div key={video.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer" onClick={() => handleVideoSelect(video.url)}>
                <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
              </div>
            ))}
          </div>

          {selectedVideo && (
            <div className="w-full max-w-2xl mb-4">
              <iframe
                width="100%"
                height="315"
                src={selectedVideo}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Resources;
