import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

// const features = [
//   {
//     name: 'Push to deploy',
//     description:
//       'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
//     icon: CloudArrowUpIcon,
//   },
//   {
//     name: 'SSL certificates',
//     description:
//       'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
//     icon: LockClosedIcon,
//   },
//   {
//     name: 'Simple queues',
//     description:
//       'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
//     icon: ArrowPathIcon,
//   },
//   {
//     name: 'Advanced security',
//     description:
//       'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
//     icon: FingerPrintIcon,
//   },
// ];
const features = [
  {
    name: 'Easy Event Creation',
    description:
      'Create events with customizable details, ticket types, and pricing in just a few clicks.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Secure Payments',
    description:
      'Enable safe and seamless payment options for event tickets, ensuring a reliable booking experience.',
    icon: LockClosedIcon,
  },
  {
    name: 'Real-Time Updates',
    description:
      'Stay informed with live updates on ticket sales, event status, and user engagement.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Enhanced User Experience',
    description:
      'Provide a smooth booking journey with user-friendly navigation and responsive design.',
    icon: FingerPrintIcon,
  },
];


const links = [
  { name: 'Open roles', href: '#' },
  { name: 'Internship program', href: '#' },
  { name: 'Our values', href: '#' },
  { name: 'Meet our leadership', href: '#' },
];

const workStats = [
  { name: 'Offices worldwide', value: '12' },
  { name: 'Full-time colleagues', value: '300+' },
  { name: 'Hours per week', value: '40' },
  { name: 'Paid time off', value: 'Unlimited' },
];

const businessStats = [
  { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
  { id: 2, name: 'Assets under holding', value: '$119 trillion' },
  { id: 3, name: 'New users annually', value: '46,000' },
];

const LandingPage = () => {
  return (
    <div>
      {/* Landing Section */}
      <div className="relative bg-gray-900 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74% 44%, 100% 62%, 97% 27%, 85% 0%, 80% 2%, 72% 32%, 60% 62%, 52% 68%, 47% 58%, 45% 34%, 27% 77%, 0% 65%, 18% 100%, 28% 77%, 76% 98%, 74% 44%)',
            }}
            className="absolute left-1/2 -translate-x-1/2 top-[-10rem] bg-gradient-to-tr from-purple-600 via-blue-500 to-indigo-500 opacity-30 w-[90rem] h-[50rem]"
          />
        </div>
        <div className="relative text-center px-6 py-20 lg:px-8">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Seamlessly Manage Events
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 sm:mt-8">
            Join, create, and manage events effortlessly with our platform.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Link to="/admin">
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-md px-6 py-3 shadow-lg">
                Admin Dashboard
              </button>
            </Link>
            <Link to="/user">
              <button className="bg-green-600 hover:bg-green-500 text-white rounded-md px-6 py-3 shadow-lg">
                User Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold text-indigo-600">
              
            </h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Everything You Need to Book, Manage, and Promote Your Events !!...
            </p>
            <p className="mt-6 text-lg text-gray-600">
            Effortlessly browse, book, and manage events with a seamless experience.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold text-gray-900">
                    <div className="absolute left-0 top-0 flex items-center justify-center rounded-lg bg-indigo-600 w-10 h-10">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Business Stats Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {businessStats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Work With Us Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          className="absolute inset-0 -z-10 w-full h-full object-cover"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
              Work with us
            </h2>
            <p className="mt-8 text-lg font-medium text-gray-300 sm:text-xl">
              Anim aute id magna aliqua ad ad non deserunt sunt.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <a key={link.name} href={link.href}>
                  {link.name} <span aria-hidden="true">&rarr;</span>
                </a>
              ))}
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {workStats.map((stat) => (
                <div key={stat.name} className="flex flex-col-reverse gap-1">
                  <dt className="text-base text-gray-300">{stat.name}</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
