import csv
import json
import sys
import os

def csv_to_json(csv_file, json_file=None, encoding='utf-8'):
    """
    Converte un file CSV in formato JSON
    
    Args:
        csv_file: percorso del file CSV di input
        json_file: percorso del file JSON di output (opzionale)
        encoding: codifica del file (default: utf-8)
    """
    try:
        # Leggi il file CSV
        with open(csv_file, 'r', encoding=encoding) as f:
            # Usa DictReader per convertire automaticamente in dizionari
            csv_reader = csv.DictReader(f)
            
            # Converti in lista di dizionari
            data = list(csv_reader)
        
        # Converti in JSON
        json_data = json.dumps(data, indent=2, ensure_ascii=False)
        
        # Se è specificato un file di output, salvalo
        if json_file:
            with open(json_file, 'w', encoding=encoding) as f:
                f.write(json_data)
            print(f"✓ File JSON salvato in: {json_file}")
        else:
            # Altrimenti stampa a schermo
            print(json_data)
        
        return data
    
    except FileNotFoundError:
        print(f"✗ Errore: File '{csv_file}' non trovato")
        sys.exit(1)
    except Exception as e:
        print(f"✗ Errore durante la conversione: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # ← SPECIFICA QUI IL TUO FILE CSV
    csv_input = "../Crop_recommendation.csv"  # Cambia con il percorso del tuo file
    
    # Genera il nome del file JSON dalla base del CSV
    filename = os.path.splitext(os.path.basename(csv_input))[0] + '.json'
    
    # Crea la cartella src se non esiste
    os.makedirs('src', exist_ok=True)
    json_output = os.path.join('src', filename)
    
    csv_to_json(csv_input, json_output)