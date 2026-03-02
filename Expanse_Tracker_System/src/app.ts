import { ExpenseService } from "./service/expanseServices.js";
import { UI } from "./ui/ui.js";

const service = new ExpenseService();
const ui = new UI(service);

ui.initialize();