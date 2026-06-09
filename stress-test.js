import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 22 },
    { duration: '1m', target: 50 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('https://httpbin.org/delay/1');
  check(res, {
    'is status 200': (r) => r.status === 200,
    "aceptable response time": (r) => r.timings.duration < 600,
  });
  sleep(1);
}
