/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const validMethods = [
    'registerView', 
    'subscribe', 
    'submitPinCode'
  ];
  const inputSlug = req.query.slug as string;

  if (req.method === 'POST' && validMethods.includes(inputSlug)) {
    if(inputSlug === 'registerView'){
      const clientUA  = req.body.clientUA || req.headers['user-agent'] as string;
      const forwarded = req.headers['x-forwarded-for'];
      const clientIP  = req.body.clientIP || (typeof forwarded === 'string' ? forwarded.split(/, /)[0] : req.socket.remoteAddress);
      req.body = {
        ...req.body,
        clientUA,
        clientIP,
      };
    }

    try {
      const partnerApiUrl = `${req.body?.partnerApi}/lpx/partnerApi/${inputSlug}`;
      const response      = await axios.post(partnerApiUrl, req?.body);

      res.status(response.status).json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: 'An error occurred while making the request.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
