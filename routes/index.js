import { Router }            from 'express';
import { doctor, servicios } from '../config/doctor.js';

const router = Router();

// GET /
router.get('/', (req, res) => {
  res.render('home', { title: 'Inicio', activePage: 'inicio', doctor, servicios });
});

// GET /servicios
router.get('/servicios', (req, res) => {
  res.render('servicios', { title: 'Servicios', activePage: 'servicios', doctor, servicios });
});

export default router;
