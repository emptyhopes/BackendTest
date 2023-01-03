import { GraphQLSeeds } from "@/Application/Ship/Seeds/index";

import { RolesResponse } from "@/Application/Containers/Roles/Tests/RolesResponse";

describe("Roles", () => {
  test("GetAllRoles", async () => {
    const response = await RolesResponse.GetAllRolesResponse();
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") return;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetAllRoles).not.toEqual(null);
  });

  // test("GetAllRolesPagination", async () => {
  //   const length = (await RolesResponse.GetCountRoles()) - 7;
  //   const response = await RolesResponse.GetAllRolesPaginationResponse({ input: { take: 2, skip: length } });
  //   expect(response.body.kind === "single");
  //   if (response.body.kind !== "single") return;

  //   expect(response.body.singleResult.errors).toBeUndefined();
  //   expect(response.body.singleResult.data?.GetAllRolesPagination).not.toEqual(null);
  //   expect(response.body.singleResult.data?.GetAllRolesPagination[0]?.name).toEqual("FirstGetAllRolesPagination");
  //   expect(response.body.singleResult.data?.GetAllRolesPagination[1]?.name).toEqual("SecondGetAllRolesPagination");
  // });

  test("GetOneRoleByID", async () => {
    const role = await RolesResponse.GetRoleIDByName("test");
    if (!role) return;

    const response = await RolesResponse.GetOneRoleByIDResponse({ id: role.id });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") return;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetOneRoleByID).not.toEqual(null);
    expect(response.body.singleResult.data?.GetOneRoleByID.name).toEqual("test");
  });

  test("GetOneRoleByName", async () => {
    const response = await RolesResponse.GetOneRoleByNameResponse({ name: "GetOneRoleByName" });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") return;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetOneRoleByName).not.toEqual(null);
    expect(response.body.singleResult.data?.GetOneRoleByName.name).toEqual("GetOneRoleByName");
  });

  test("CreateRole", async () => {
    const response = await RolesResponse.CreateRoleResponse({ input: { name: "CreateRole" } });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") return;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.CreateRole).not.toEqual(null);
    expect(response.body.singleResult.data?.CreateRole.name).toEqual("CreateRole");
  });

  test("UpdateRole", async () => {
    const role = await RolesResponse.GetRoleIDByName("UpdateRole");
    if (!role) return;

    const response = await RolesResponse.UpdateRoleResponse({ input: { id: role.id, name: "UpdatedRole" } });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") return;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.UpdateRole).not.toEqual(null);
    expect(response.body.singleResult.data?.UpdateRole.name).toEqual("UpdatedRole");
  });

  test("DeleteRoleByID", async () => {
    const role = await RolesResponse.GetRoleIDByName("DeleteRoleByID");
    if (!role) return;

    const response = await RolesResponse.DeleteRoleByIDResponse({ id: role.id });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") return;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.DeleteRoleByID).not.toEqual(null);
    expect(response.body.singleResult.data?.DeleteRoleByID.name).toEqual("DeleteRoleByID");
  });

  test("DeleteRoleByName", async () => {
    const response = await RolesResponse.DeleteRoleByNameResponse({ name: "DeleteRoleByName" });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") return;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.DeleteRoleByName).not.toEqual(null);
    expect(response.body.singleResult.data?.DeleteRoleByName.name).toEqual("DeleteRoleByName");
  });

  beforeAll(async () => {
    await GraphQLSeeds.Init();
    // await RolesResponse.CreateRoleResponse({ input: { name: "FirstGetAllRolesPagination" } });
    // await RolesResponse.CreateRoleResponse({ input: { name: "SecondGetAllRolesPagination" } });
    await RolesResponse.CreateRoleResponse({ input: { name: "GetOneRoleByID" } });
    await RolesResponse.CreateRoleResponse({ input: { name: "GetOneRoleByName" } });
    await RolesResponse.CreateRoleResponse({ input: { name: "UpdateRole" } });
    await RolesResponse.CreateRoleResponse({ input: { name: "DeleteRoleByID" } });
    await RolesResponse.CreateRoleResponse({ input: { name: "DeleteRoleByName" } });
  });

  afterAll(async () => {
    // await RolesResponse.DeleteRoleByNameResponse({ name: "FirstGetAllRolesPagination" });
    // await RolesResponse.DeleteRoleByNameResponse({ name: "SecondGetAllRolesPagination" });
    await RolesResponse.DeleteRoleByNameResponse({ name: "GetOneRoleByID" });
    await RolesResponse.DeleteRoleByNameResponse({ name: "GetOneRoleByName" });
    await RolesResponse.DeleteRoleByNameResponse({ name: "CreateRole" });
    await RolesResponse.DeleteRoleByNameResponse({ name: "UpdatedRole" });
  });
});
