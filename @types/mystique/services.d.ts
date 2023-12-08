declare module 'mystique/services/Theme' {
    /**
     * The available colours for use within Mystique based applications.
     */
    export interface MystiqueThemeColours {
      // See: https://material.io/design/color/the-color-system.html#color-theme-creation
      primary: string; // colour for primary actions and other features
      primaryVariant: string; // variant of primary for transition effects and contrast
      onPrimary: string; // text colour on primary elements
      secondary: string; // colour for other focal points (e.g. FAB, progress bars)
      secondaryVariant: string; // variant of secondary for transition effects and contrast
      onSecondary: string; // text colour on secondary elements
      surface: string; // card/modal surface colour
      onSurface: string; // text colour on surface elements
      background: string; // background colour
      onBackground: string; // text colour on background elements
      success: string; // colour for success messages
      onSuccess: string; // text colour on success elements
      error: string; // colour for error messages
      onError: string; // text colour on error elements
    }
  }
  