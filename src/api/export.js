export const exportIssuesRequest = (url, options) => 
  fetch(`/api/export/issues/?issuesUrl=${url}`, {
    headers: {
      ...options.headers,
      'Content-Type':'text/csv',
    },
  });
