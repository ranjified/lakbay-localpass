export const colors = {
  background: "#F7F1E4",
  surface: "#FFFCF4",
  text: "#123224",
  mutedText: "#5F7068",
  border: "#E6D8BE",
  heritage: "#416B5B",
  nature: "#2B6D4F",
  reward: "#F4A623",
  danger: "#A33B2F",
  white: "#FFFFFF"
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };

export const radius = { sm: 8, md: 12, lg: 18, xl: 24 };

export const typography = {
  title: { fontSize: 28, lineHeight: 34, fontWeight: "800" as const },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: "800" as const },
  body: { fontSize: 15, lineHeight: 22, fontWeight: "400" as const },
  label: { fontSize: 12, lineHeight: 16, fontWeight: "700" as const }
};

export const shadow = {
  card: {
    shadowColor: "#123224",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  }
};

export const layout = { screenPadding: 18, tapTarget: 48 };
