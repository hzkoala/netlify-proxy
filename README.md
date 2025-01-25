# Netlify Proxy

A simple Netlify proxy service that forwards requests to a target domain.

## Features

- Forwards all requests to target domain
- Modifies request headers
- Handles all HTTP methods
- Preserves URL parameters and paths
- Easy configuration through `netlify.toml`
- No build process required
- Lightweight and fast

## Prerequisites

- Netlify account
- Basic understanding of HTTP proxying
- Node.js (for local development)

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your `netlify.toml` file (see Configuration section)
4. Deploy to Netlify

## Configuration

### netlify.toml

The main configuration is done in `netlify.toml`. Example configuration:

```toml
[build]
  functions = "functions"

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/proxy"
  status = 200
  force = true
```

### Environment Variables

Set these in your Netlify dashboard:

- `TARGET_DOMAIN`: The domain you want to proxy requests to (required)
- `MODIFY_HEADERS`: Set to "true" if you want to modify request headers (optional)

## Usage

Once deployed, your Netlify site will automatically proxy all requests to your target domain. For example:

- Your proxy: `https://your-netlify-site.netlify.app/path`
- Will forward to: `https://target-domain.com/path`

### Local Development

1. Install Netlify CLI:
   ```bash
   npm install netlify-cli -g
   ```
2. Run locally:
   ```bash
   netlify dev
   ```

## Limitations

- Some headers might be restricted by Netlify
- Maximum request/response size limits apply
- Function execution time limits apply

## Troubleshooting

Common issues and solutions:

1. 502 errors: Check your target domain configuration
2. Timeout errors: Ensure your target responds within Netlify's timeout limits
3. CORS issues: Configure appropriate CORS headers in your proxy function

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes. 