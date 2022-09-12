import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Inscription } from 'src/app/core/models/inscription';
import { InscriptionsService } from 'src/app/core/services/inscriptions.service';

@Component({
  selector: 'app-inscriptions-table',
  templateUrl: './inscriptions-table.component.html',
  styleUrls: ['./inscriptions-table.component.scss'],
})
export class InscriptionsTableComponent {
  displayedColumns = ['id', 'course', 'student', 'options'];
  data: Inscription[] = [];
  dataSource = new MatTableDataSource(this.data);

  constructor(private inscriptionsService: InscriptionsService) {
    this.inscriptionsService.getInscriptions().subscribe((inscriptions) => {
      this.dataSource = new MatTableDataSource(inscriptions);
    });
  }

  delete(id: string): void {
    this.inscriptionsService.deleteInscription(id);
  }
}
