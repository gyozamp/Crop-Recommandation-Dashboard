# 🌱 - Crop Recommandion Dashboard
Questo progetto è una **dashboard interattiva** sviluppata in **React** per esplorare e visualizzare i dati del **[Crop Recommendation Dataset](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset)**, un dataset proveniente da Kaggle utilizzato per analizzare le caratteristiche del suolo e identificare la coltura più adatta in base ai parametri ambientali.

L’obiettivo della dashboard è fornire uno strumento semplice, pulito e intuitivo per:
- Analizzare le variabili agronomiche (N, P, K, pH, temperatura, umidità, pioggia);
- Comprendere la distribuzione delle colture;
- Filtrare rapidamente i dati;
- Visualizzare dati e relazioni tramite grafici e tabelle interattive.

# IDE
- Visual Studio Code

# Tech Stack
- TypeScript
- React
- Tailwind
- Vite
- Heroicons
- Python for csv to Json conversion

# Project Structure
```text
src/
├─ components/
├─ constans/
├─ data/
│  └─ Crop_Recommandation.json
├─ hooks/
├─ layout/
├─ pages/
├─ router/
├─ service/
├─ App.tsx
└─ main.tsx
```
# Running the Project
1. **Clone or fork** this repo
   
2. **Install root dependencies**
   ```text
     npm install
   ```

3. **Start dev**
   ```text
     npm run dev
   ```

# Running (after setup)
Go back to the root folder and run the following command:
  ```text
     npm run dev
   ```

# Future Development
- Motore di raccomandazione “what-if”: aggiungere un backend leggero (es. API in Node/Express o FastAPI) che esegua un modello di classificazione addestrato sul dataset Kaggle per suggerire la coltura ideale dati N, P, K, temperatura, umidità, pH e pioggia; integrare una pagina/form di input e visualizzare la probabilità per le prime colture consigliate;
- Pipeline dati e aggiornabilità: sostituire il JSON statico con un endpoint REST/GraphQL o storage (S3/DB) per caricare dataset aggiornati, con job ETL che validano e normalizzano i campi; prevedere una funzione di upload protetta e versionamento dei dataset;
- Nuove visualizzazioni analitiche: attivare e ampliare il grafico a barre orizzontali per confrontare metriche medie per coltura e aggiungere heatmap di correlazione N/P/K vs resa, plus trend lines per intervalli di temperatura/umidità;
- Personalizzazione e collaborazione: introdurre autenticazione, preferiti/salvataggi di viste (filtri + layout grafici), note condivise e link condivisibili verso uno stato specifico della dashboard.
