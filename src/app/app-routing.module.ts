import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChapterComponent } from './chapter/chapter.component';
import { SettingsAdvancedComponent } from './settings/settings-advanced/settings-advanced.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GetHelpComponent } from './get-help/get-help.component';
import { WhatsNewComponent } from './whats-new/whats-new.component';
import { DeploymentInfoComponent } from './deployment-info/deployment-info.component';
import { ImpressumComponent } from './impressum/impressum.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: 'chapter/:chapterName', component: ChapterComponent },
  { path: 'settings', component: SettingsAdvancedComponent },
  { path: 'settings/:settingsName', component: SettingsAdvancedComponent },
  { path: 'help', component: GetHelpComponent },
  { path: 'deployment', component: DeploymentInfoComponent },
  { path: 'whats-new', component: WhatsNewComponent },
  { path: 'impressum', component: ImpressumComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
