import { View, Text, SectionList, StyleSheet } from "react-native";

const contactsData = [
  {
    title: "Адміністрація",
    data: [
      {
        id: "1",
        department: "Приймальня",
        person: "Олена Іваненко",
        phone: "+380 41 222 33 44",
        email: "office@company.ua",
        address: "м. Житомир, вул. Київська, 10",
      },
      {
        id: "2",
        department: "Директор",
        person: "Андрій Ковальчук",
        phone: "+380 41 222 33 45",
        email: "director@company.ua",
        address: "м. Житомир, вул. Київська, 10",
      },
    ],
  },
  {
    title: "Відділ підтримки",
    data: [
      {
        id: "3",
        department: "Технічна підтримка",
        person: "Марина Шевчук",
        phone: "+380 67 123 45 67",
        email: "support@company.ua",
        address: "м. Житомир, вул. Перемоги, 5",
      },
      {
        id: "4",
        department: "Клієнтський сервіс",
        person: "Ігор Мельник",
        phone: "+380 50 234 56 78",
        email: "help@company.ua",
        address: "м. Житомир, вул. Перемоги, 5",
      },
    ],
  },
  {
    title: "Відділ продажів",
    data: [
      {
        id: "5",
        department: "Менеджер з продажу",
        person: "Наталія Бондар",
        phone: "+380 93 345 67 89",
        email: "sales@company.ua",
        address: "м. Житомир, вул. Соборна, 18",
      },
      {
        id: "6",
        department: "Робота з партнерами",
        person: "Віктор Савчук",
        phone: "+380 96 456 78 90",
        email: "partners@company.ua",
        address: "м. Житомир, вул. Соборна, 18",
      },
    ],
  },
];

export default function ContactsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.department}>{item.department}</Text>
      <Text style={styles.person}>Контактна особа: {item.person}</Text>
      <Text style={styles.info}>Телефон: {item.phone}</Text>
      <Text style={styles.info}>Email: {item.email}</Text>
      <Text style={styles.info}>Адреса: {item.address}</Text>
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <SectionList
        sections={contactsData}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f3c88",
    marginTop: 12,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e3e7ed",
  },
  department: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#222",
  },
  person: {
    fontSize: 15,
    marginBottom: 4,
    color: "#444",
  },
  info: {
    fontSize: 14,
    marginBottom: 3,
    color: "#666",
  },
  separator: {
    height: 10,
  },
});
