import React from 'react'
import { CircularProgress, Box, Typography } from '@mui/material'

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)'
      }}
    >
      <CircularProgress 
        size={70}
        thickness={4}
        sx={{
          color: '#3B82F6',
          animation: 'spin 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          '@keyframes spin': {
            '0%': {
              transform: 'rotate(0deg) scale(1)',
              opacity: 1
            },
            '50%': {
              transform: 'rotate(180deg) scale(1.1)',
              opacity: 0.7
            },
            '100%': {
              transform: 'rotate(360deg) scale(1)',
              opacity: 1
            },
          },
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }}
      />
      <Typography 
        variant="h6" 
        sx={{
          color: '#4B5563',
          fontWeight: 500,
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              opacity: 1
            },
            '50%': {
              opacity: 0.5
            }
          }
        }}
      >
        Loading...
      </Typography>
    </Box>
  )
}

export default Loading