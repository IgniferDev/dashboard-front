import { Component } from '@angular/core';
import { DatasetService } from '../../services/dataset.service';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  head: any[] = [];
  missing: any = {};
  selectedFile: File | null = null;

  // Configuración inicial del gráfico
  missingData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { label: 'Valores faltantes por columna', data: [] }
    ]
  };

  duplicatesData: ChartData<'doughnut'> = {
    labels: ['Duplicadas', 'Únicas'],
    datasets: [{ data: [] }]
  };

  dtypesData: ChartData<'pie'> = {
    labels: [],
    datasets: [{ data: [] }]
  };

  uniqueCountsData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ label: 'Valores únicos por columna', data: [] }]
  };


  constructor(private datasetService: DatasetService) {}

  // Guardar archivo cuando lo selecciona el usuario
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  // Enviar archivo al backend
  onUpload() {
    if (!this.selectedFile) return;

    this.datasetService.upload(this.selectedFile).subscribe({
      next: () => {
        alert('✅ Archivo subido correctamente');
        this.loadData();
      },
      error: (err) => {
        console.error('Error al subir archivo:', err);
        alert('❌ Error al subir archivo');
      }
    });
  }

  // Cargar estadísticas y preview
  loadData() {
  // Cargar preview de tabla
  this.datasetService.getHead().subscribe(data => this.head = data);

  // Valores faltantes
  this.datasetService.getMissing().subscribe(data => {
    this.missing = data;
    this.missingData = {
      labels: Object.keys(data),
      datasets: [
        { label: 'Valores faltantes por columna', data: Object.values(data) }
      ]
    };
  });

  // Duplicados
  this.datasetService.getDuplicates().subscribe(data => {
    this.duplicatesData = {
      labels: ['Duplicadas', 'Únicas'],
      datasets: [{ data: [data.duplicadas, data.unicas] }]
    };
  });

  // Tipos de datos
  this.datasetService.getDtypes().subscribe(data => {
    this.dtypesData = {
      labels: Object.keys(data),
      datasets: [{ data: Object.values(data) }]
    };
  });

  // Valores únicos
  this.datasetService.getUniqueCounts().subscribe(data => {
    this.uniqueCountsData = {
      labels: Object.keys(data),
      datasets: [{ label: 'Valores únicos por columna', data: Object.values(data) }]
    };
  });
}



}
