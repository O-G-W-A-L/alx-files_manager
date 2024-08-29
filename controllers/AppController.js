/* eslint-disable import/no-named-as-default */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

export default class AppController {
  // Checks the status of Redis and DB
  static async getStatus(req, res) {
    try {
      // Await results from isAlive() if they are asynchronous
      const redisStatus = await redisClient.isAlive();
      const dbStatus = await dbClient.isAlive();
      res.status(200).json({
        redis: redisStatus,
        db: dbStatus,
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Retrieves stats on the number of users and files
  static async getStats(req, res) {
    try {
      // Await results from nbUsers() and nbFiles()
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();
      res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
