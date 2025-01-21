// API Key: 0e97c8bf1a0995d060d4
// API Secret: 342e307d15a5cec3dba7a738ae4a1f99f7e31b773a51736d118b51cb3d530661
// JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5ODc1ZTIzOS0wMDNiLTQxOGQtOThlNS0zYTI4NTQ4MTQzYTEiLCJlbWFpbCI6InJpc2h1NjA1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwZTk3YzhiZjFhMDk5NWQwNjBkNCIsInNjb3BlZEtleVNlY3JldCI6IjM0MmUzMDdkMTVhNWNlYzNkYmE3YTczOGFlNGExZjk5ZjdlMzFiNzczYTUxNzM2ZDExOGI1MWNiM2Q1MzA2NjEiLCJleHAiOjE3NjkwMDI5NjZ9.rodYFNE4XXWMBViNCvJVpV80KspVhI98PcuuzbbtIGw

// Gateway Key: vgI-IFaga02w-n8UcavfCRA5mlfuChKMg090qr9sdl_k4oM32FyV_uaAjSa5EjnM



export const apiKey = "0e97c8bf1a0995d060d4"
export const apiSecret = "342e307d15a5cec3dba7a738ae4a1f99f7e31b773a51736d118b51cb3d530661"
export const gatewayJwt = "n8UcavfCRA5mlfuChKMg090qr9sdl_k4oM32FyV_uaAjSa5EjnM"
export const ipfsGateway = "red-glorious-gopher-806"

export const readHeader = {
    "Content-Type": "application/json",
}

export const getHeader = {
    headers: {
        pinata_api_key: apiKey,
        pinata_secret_api_key: apiSecret,
    }
}

export const sendJsonHeader = {
    headers: {
        'Content-Type': 'application/json',
        pinata_api_key: apiKey,
        pinata_secret_api_key: apiSecret,
    }
}