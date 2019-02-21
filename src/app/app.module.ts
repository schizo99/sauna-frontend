import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TempComponent } from './temp/temp.component';

const appRoutes: Routes = [
  {
    path: '',
    component: TempComponent,
    data: { title: 'Temp' }
  },
  { path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TempComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
