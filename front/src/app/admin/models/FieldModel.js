export class ParentField {
  constructor(label, code) {
    this.label = label;
    this.code = code;
  }
}
export class Field {
  constructor(label, code, unitsId, parentFieldId) {
    this.label = label;
    this.code = code;
    this.unitsId = unitsId;
    this.parentFieldId = parentFieldId;
  }
}

export class ChildField {
  constructor(label, code, fieldId) {
    this.label = label;
    this.code = code;
    this.fieldId = fieldId;
  }
}
