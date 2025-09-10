> **Note:** When creating or updating a record, the app sends the internal values (in Spanish) of the dropdowns to HubSpot, not the English display text. For example, 'In use' sends `En uso`, 'Excavator' sends `Excavadora`, etc.


## Custom Object
- [Maquinarias](https://app.hubspot.com/contacts/50475181/objects/2-49896952/views/all/list) Nombre, Estado de la maquinaria, Tipo de maquinaria

## Custom Object: Maquinarias (Machinery)

This project uses a custom object called **Maquinarias** (Machinery) in HubSpot. Each record represents a piece of machinery and includes the following properties:

### Properties

| Property Name           | Internal Name            | Type     | Description                                 | Options (if applicable)                 |
|------------------------|-------------------------|----------|---------------------------------------------|-----------------------------------------|
| Name                   | nombre                  | Text     | The name of the machinery                   | -                                       |
| Machinery Status       | estado_de_la_maquinaria | Dropdown | The current status of the machinery         | In use, Under repair, In storage, Sold  |
| Machinery Type         | tipo_de_maquinaria      | Dropdown | The type/category of the machinery          | Excavator, Generator, Crane             |

#### Property Details
- **Name (`nombre`)**: Free text field for the machinery's name.
- **Machinery Status (`estado_de_la_maquinaria`)**: Dropdown with the following options:
	- In use (`En uso`)
	- Under repair (`En reparacion`)
	- In storage (`En almacen`)
	- Sold (`Vendida`)
- **Machinery Type (`tipo_de_maquinaria`)**: Dropdown with the following options:
	- Excavator (`Excavadora`)
	- Generator (`Generador`)
	- Crane (`Grua`)

### How the App Uses These Properties

- The homepage displays a table listing all machinery records, showing their Name, Status, and Type.
- The "Add to this table" button opens a form to create a new machinery record. The form includes:
	- A text input for Name
	- A dropdown for Machinery Status (with the options above)
	- A dropdown for Machinery Type (with the options above)
- When the form is submitted, the app sends a POST request to HubSpot to create a new record with the selected values.

### Example

| Name         | Machinery Status | Machinery Type |
|--------------|------------------|---------------|
| CAT 320D     | In use           | Excavator     |
| Honda GenX   | In storage       | Generator     |
| Liebherr LTM | Sold             | Crane         |

---