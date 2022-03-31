import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConstants {
    public successText = "Glückwunsch!";
    public successMessage = "Sie haben das Versicherungsformular erfolgreich ausgefüllt. Wir werden uns in Kürze bei Ihnen melden.";
    public navigateToHomeText = "Zur Startseite";
    public questionText = 'Frage';
    public multiSelectText = 'Wählen Sie eine oder mehrere Optionen aus.';
    public mandatoryText = 'Diese Frage ist obligatorisch.';
    public submitButtonText = 'Senden';
    public placeHolderText = 'Geben Sie Ihre Antwort ein';
    public headerText = 'Versicherungsformular';
    public welcomeText = 'Willkommen!';
    public welcomeMessage =
      'Bitte füllen Sie den folgenden Fragebogen aus, um mehr über die Versicherung zu erfahren.';
    public startButtonText = 'Fangen wir an';
}