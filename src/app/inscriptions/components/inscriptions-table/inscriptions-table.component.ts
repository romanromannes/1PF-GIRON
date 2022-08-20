import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InscriptionVM } from 'src/app/shared/models/inscription';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-inscriptions-table',
  templateUrl: './inscriptions-table.component.html',
  styleUrls: ['./inscriptions-table.component.scss'],
})
export class InscriptionsTableComponent {
  displayedColumns = ['id', 'course', 'student', 'options'];
  data: InscriptionVM[] = [];
  dataSource = new MatTableDataSource(this.data);

  constructor(private mainService: MainService) {
    this.mainService.getAppState().subscribe((x) => {
      let inscriptionsVM: InscriptionVM[] = x.inscriptions.map((l) => {
        const students = x.students.filter((z) => z.id == l.studentId);
        const courses = x.courses.filter((z) => z.id == l.courseId);
        return {
          id: l.id,
          course: courses[0],
          student: students[0],
        };
      });
      this.dataSource = new MatTableDataSource(inscriptionsVM);
    });
  }

  delete(id: string): void {
    this.mainService.deleteInscription(id);
  }
}
