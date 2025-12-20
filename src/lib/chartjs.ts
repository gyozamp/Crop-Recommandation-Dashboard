// src/lib/chartjs.ts
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

/**
 * Registrazione globale dei moduli Chart.js.
 * Va importato UNA SOLA VOLTA nell'app.
 */
ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,   
  BarElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);
