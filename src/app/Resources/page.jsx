// pages/resources.js
export default function Resources() {
    const resources = [
      { title: 'Managing Stress', description: 'Learn how to manage stress effectively.', link: '#' },
      { title: 'Coping with Anxiety', description: 'Practical tips for dealing with anxiety.', link: '#' },
    ];
  
    return (
      <div className="min-h-screen bg-blue-50 flex flex-col justify-center">
        <div className="max-w-4xl w-full mx-auto bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-blue-600 text-center">Resources</h2>
          <div className="mt-8 grid grid-cols-1 gap-6">
            {resources.map((resource, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="text-xl font-bold text-gray-700">{resource.title}</h3>
                <p className="text-gray-600">{resource.description}</p>
                <a href={resource.link} className="text-blue-600 mt-2 inline-block">Read More</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  