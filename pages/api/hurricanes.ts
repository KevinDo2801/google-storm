import type { NextApiRequest, NextApiResponse } from 'next'
import { HurricaneAPIService } from '@/lib/hurricane-apis'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const hurricaneService = HurricaneAPIService.getInstance()
    
    // Check for force refresh parameter
    const forceRefresh = req.query.refresh === 'true'
    
    // Fetch global hurricane and storm data
    const response = await hurricaneService.getGlobalHurricanes(forceRefresh)

    res.status(200).json(response)
  } catch (error: any) {
    console.error('Error fetching hurricane data:', error)
    res.status(500).json({ 
      error: 'Failed to fetch hurricane data',
      details: error.message,
      hurricanes: [],
      lastUpdated: new Date().toISOString(),
      source: 'Error'
    })
  }
}
