catch (error) {
  console.error('Error in getUserFromToken:', {
    name: error instanceof Error ? error.name : 'Unknown',
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : '',
    error: error
  });
  return null;
}