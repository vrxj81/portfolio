import { Permission } from './permission.entity';

describe('Permission', () => {
  it('should be defined', () => {
    expect(new Permission()).toBeDefined();
  });

  it('should assign properties correctly through constructor', () => {
    const data = {
      name: 'test-permission',
      action: 'read',
      subject: 'article',
      conditions: JSON.stringify({ role: 'admin' }),
    };
    const permission = new Permission(data);
    expect(permission.name).toBe(data.name);
    expect(permission.action).toBe(data.action);
    expect(permission.subject).toBe(data.subject);
    expect(permission.conditions).toBe(data.conditions);
  });

  it('should have default createdAt and updatedAt dates', () => {
    const permission = new Permission();
    expect(permission.createdAt).toBeInstanceOf(Date);
    expect(permission.updatedAt).toBeInstanceOf(Date);
  });

  it('should update updatedAt date on update', () => {
    const permission = new Permission();
    const initialUpdatedAt = permission.updatedAt;
    permission.updatedAt = new Date();
    expect(permission.updatedAt).not.toBe(initialUpdatedAt);
  });

  it('should set createdAt to the current date on creation', () => {
    const before = new Date();
    const permission = new Permission();
    const after = new Date();
    expect(permission.createdAt).toBeInstanceOf(Date);
    expect(permission.createdAt.getTime()).toBeGreaterThanOrEqual(
      before.getTime(),
    );
    expect(permission.createdAt.getTime()).toBeLessThanOrEqual(after.getTime());
  });

  it('should not change createdAt on update', () => {
    const permission = new Permission();
    const initialCreatedAt = permission.createdAt;
    permission.updatedAt = new Date();
    expect(permission.createdAt).toBe(initialCreatedAt);
  });
});
