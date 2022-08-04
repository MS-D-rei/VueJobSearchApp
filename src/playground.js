// const axios = require("axios");

// const url = " http://localhost:3000/jobs";

// // axios
// //   .get(url) // return Promise object
// //   .then((response) => {
// //     console.log(response.data);
// //   })
// //   .catch((error) => {
// //     console.log(error);
// //   })
// //   .then(() => {});

// const fetchJobsV1 = async () => {
//   try {
//     const response = await axios.get(url);
//     console.log(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// fetchJobsV1();

const { ref, reactive, computed, toRef, toRefs } = require("vue");

const firstPerson = ref({
  name: "Boris",
});
console.log(firstPerson);
// =>
// RefImpl {
//   __v_isShallow: false,
//   dep: undefined,
//   __v_isRef: true,
//   _rawValue: { name: 'Boris' },
//   _value: { name: 'Boris' }
// }

// firstPerson.value.job will occur error => TypeError: Cannot set properties of undefined (setting 'job')
// firstPerson.job add property or method to outside of value property.
firstPerson.job = "Vue Developer";
console.log(firstPerson);
// =>
// RefImpl {
//   __v_isShallow: false,
//   dep: undefined,
//   __v_isRef: true,
//   _rawValue: { name: 'Boris' },
//   _value: { name: 'Boris' },
//   job: 'Vue Developer' // This line
// }

// reactive method makes a proxy of the object in it.
// it means that the proxy is not equal to the original object,
// and reactivity connection is lost.
const secondPerson = reactive({
  name: "Thomas",
});
console.log(secondPerson);
// => { name: 'Thomas' }
// when reactive used, can add property or method to the proxy inside of it.
secondPerson.job = "Vue Developer";
console.log(secondPerson);
// { name: 'Thomas', job: 'Vue Developer' }

const firstTitle = computed(() => `${firstPerson.value.name} the Great`);
const secondTitle = computed(() => `${secondPerson.name} the Great`);
console.log(firstTitle);
// =>
// <ref *1> ComputedRefImpl {
//   _setter: [Function: setter],
//   dep: undefined,
//   __v_isRef: true,
//   _dirty: true,
//   effect: ReactiveEffect {
//     fn: [Function (anonymous)],
//     scheduler: [Function (anonymous)],
//     active: true,
//     deps: [],
//     parent: undefined,
//     computed: [Circular *1]
//   },
//   _cacheable: true,
//   __v_isReadonly: true
// }
console.log(firstTitle.value);
console.log(secondTitle.value);

// when title is mutated, titleLength also changes.
const firstTitleLength = computed(() => firstTitle.value.length);
const secondTitleLength = computed(() => secondTitle.value.length);
console.log(firstTitleLength.value);
console.log(secondTitleLength.value);

// Both react to mutation
firstPerson.value.name = "Mask";
secondPerson.name = "John";
console.log(firstTitle.value);
console.log(secondTitle.value);

console.log(firstTitleLength.value);
console.log(secondTitleLength.value);

// Destructuring break the connection to the original reactive object
const thirdPerson = reactive({
  firstName: "Boris",
  lastName: "Paskhaver",
});
const { firstName, lastName } = thirdPerson;
const thirdPersonTitle = computed(() => `${firstName} ${lastName} the Great`);
console.log(thirdPerson);
console.log(thirdPersonTitle.value); // Boris Paskhaver the Great
thirdPerson.firstName = "Napoleon";
thirdPerson.lastName = "Griffin";
console.log(thirdPersonTitle.value); // Boris Paskhaver the Great, no longer has connection.

// toRef create a ref for a property on a source reactive object.
// the created ref is synced with its source property.
const toRefPerson = reactive({
  firstName: "toRef",
  lastName: "makes ref object",
});
const toRefFirstName = toRef(toRefPerson, "firstName");
const toRefLastName = toRef(toRefPerson, "lastName");
const toRefPersonTitle = computed(
  () => `${toRefFirstName.value} ${toRefLastName.value} to make Vue Great`
);
console.log(toRefPersonTitle.value);
toRefFirstName.value = "toRef react";
toRefLastName.value = "mutations";
console.log(toRefPersonTitle.value);

// toRefs() converts reactive object to a plain object where
// each property of the resulting object is a ref pointing
// to the corresponding property of the original object.

const toRefsPerson = reactive({
  firstName: "toRefs",
  lastName: "converts reactive object",
});
const toRefsPersonAsRefs = toRefs(toRefsPerson);
console.log(toRefsPersonAsRefs);
// {
//   firstName: ObjectRefImpl {
//     _object: { firstName: 'toRefs', lastName: 'converts reactive object' },
//     _key: 'firstName',
//     _defaultValue: undefined,
//     __v_isRef: true
//   },
//   lastName: ObjectRefImpl {
//     _object: { firstName: 'toRefs', lastName: 'converts reactive object' },
//     _key: 'lastName',
//     _defaultValue: undefined,
//     __v_isRef: true
//   }
// }
const toRefsPersonTitle = computed(
  () =>
    `${toRefsPersonAsRefs.firstName.value} ${toRefsPersonAsRefs.lastName.value} to make Vue Great`
);
console.log(toRefsPersonTitle.value);
