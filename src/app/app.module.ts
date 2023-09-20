import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownContentComponent } from './markdown-content/markdown-content.component';
import { PageComponent } from './page/page.component';
import { PageNavBarComponent } from './page-nav-bar/page-nav-bar.component';
import { ChapterComponent } from './chapter/chapter.component';
import { ChapterSelectionComponent } from './chapter-selection/chapter-selection.component';
import { PasswordQueryComponent } from './user-input/password-query/password-query.component';
import { FormsModule } from '@angular/forms';
import { ChapterMetaDataComponent } from './chapter-meta-data/chapter-meta-data.component';
import { AreYouSureComponent } from './user-input/are-you-sure/are-you-sure.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ExportOptionsComponent } from './user-input/export-options/export-options.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CodeWindowComponent } from './code-window/code-window.component';
import { MarkdownDirective } from './markdown-content/markdown.directive';
import { SettingsShortComponent } from './settings/settings-short/settings-short.component';
import { SettingsAdvancedComponent } from './settings/settings-advanced/settings-advanced.component';
import { SettingsHeaderComponent } from './settings/settings-header/settings-header.component';
import { StorageSettingsComponent } from './settings/settings-pages/storage-settings/storage-settings.component';
import { ContactSettingsComponent } from './settings/settings-pages/contact-settings/contact-settings.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GetHelpComponent } from './get-help/get-help.component';
import { AboutSettingsComponent } from './settings/settings-pages/about-settings/about-settings.component';
import { WhatsNewComponent } from './whats-new/whats-new.component';
import { DeploymentInfoComponent } from './deployment-info/deployment-info.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ImpressumComponent } from './impressum/impressum.component';
import { SearchBarHeaderComponent } from './search-bar-header/search-bar-header.component';
import { TableOfContentComponent } from './table-of-content/table-of-content.component';
import { ChapterSearchComponent } from './chapter-search/chapter-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MarkdownContentComponent,
    PageComponent,
    PageNavBarComponent,
    ChapterComponent,
    ChapterSelectionComponent,
    PasswordQueryComponent,
    ChapterMetaDataComponent,
    AreYouSureComponent,
    FilterBarComponent,
    SearchBarComponent,
    ExportOptionsComponent,
    HomeComponent,
    CodeWindowComponent,
    MarkdownDirective,
    SettingsShortComponent,
    SettingsAdvancedComponent,
    SettingsHeaderComponent,
    StorageSettingsComponent,
    ContactSettingsComponent,
    ErrorPageComponent,
    GetHelpComponent,
    AboutSettingsComponent,
    WhatsNewComponent,
    DeploymentInfoComponent,
    ImpressumComponent,
    SearchBarHeaderComponent,
    TableOfContentComponent,
    ChapterSearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    FormsModule,
    AppRoutingModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
