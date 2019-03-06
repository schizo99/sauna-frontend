import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TempComponent } from './temp/temp.component';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';

const appRoutes: Routes = [
  {
    path: '',
    component: TempComponent,
    data: { title: 'Temp' }
  },
  {
    path: 'chart',
    component: ChartComponent,
    data: { title: 'Chart' }
  },
  { path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TempComponent,
    ChartComponent
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
